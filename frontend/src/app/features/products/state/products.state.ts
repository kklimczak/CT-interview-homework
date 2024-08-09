import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BehaviorSubject, map } from 'rxjs';
import { WarehouseItem } from '../../../core/models/warehouseItem';
import { EntityState } from '../../../shared/models/entity-state';

export interface ProductState extends EntityState<WarehouseItem> {
  pending: boolean;
}

export const INITIAL_PRODUCT_STATE = new InjectionToken('initialProductState', {
  providedIn: 'root',
  factory: () => initialState,
});

const initialState: ProductState = {
  ids: [],
  entities: {},
  pending: false,
};

@Injectable({
  providedIn: 'root',
})
export class ProductsState {
  constructor(
    private productService: ProductsService,
    @Inject(INITIAL_PRODUCT_STATE) private initialState: ProductState,
  ) {}

  #state: BehaviorSubject<ProductState> = new BehaviorSubject(
    this.initialState,
  );

  products$ = this.#state
    .asObservable()
    .pipe(map((state) => state.ids.map((id) => state.entities[id])));

  pending$ = this.#state.asObservable().pipe(map((state) => state.pending));

  loadProducts() {
    this.#state.next({
      ...this.#state.getValue(),
      pending: true,
    });

    this.productService.getProducts().subscribe((products) => {
      const ids = products.map((product) => product.id);
      const entities = products.reduce(
        (acc, product) => {
          acc[product.id] = product;
          return acc;
        },
        {} as { [key: number]: WarehouseItem },
      );

      this.#state.next({
        ids,
        entities,
        pending: false,
      });
    });
  }

  removeProduct(id: number) {
    this.productService.removeProduct(id).subscribe(() => {
      const state = this.#state.getValue();
      const ids = state.ids.filter((productId) => productId !== id);
      const { [id]: removed, ...entities } = state.entities;

      this.#state.next({
        ...state,
        ids,
        entities,
      });
    });
  }

  addProduct(product: Omit<WarehouseItem, 'id' | 'imageUrl'>) {
    this.productService
      .addProduct({ ...product, imageUrl: 'assets/logo_black.svg' })
      .subscribe((newProduct: WarehouseItem) => {
        const state = this.#state.getValue();
        this.#state.next({
          ...state,
          ids: [...state.ids, newProduct.id],
          entities: {
            ...state.entities,
            [newProduct.id]: newProduct,
          },
        });
      });
  }

  editProduct(id: number, product: Omit<WarehouseItem, 'id' | 'imageUrl'>) {
    this.productService
      .editProduct(id, { ...product, imageUrl: 'assets/logo_black.svg' })
      .subscribe((editedProduct: WarehouseItem) => {
        const state = this.#state.getValue();
        this.#state.next({
          ...state,
          entities: {
            ...state.entities,
            [editedProduct.id]: editedProduct,
          },
        });
      });
  }
}
