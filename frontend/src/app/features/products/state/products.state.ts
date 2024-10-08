import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { WarehouseItem } from '../../../core/models/warehouseItem';
import { EntityState } from '../../../shared/models/entity-state';

export interface ProductState extends EntityState<WarehouseItem> {
  pending: boolean;
  shipmentQuantityById: { [key: number]: number };
}

export const INITIAL_PRODUCT_STATE = new InjectionToken('initialProductState', {
  providedIn: 'root',
  factory: () => initialState,
});

const initialState: ProductState = {
  ids: [],
  entities: {},
  pending: false,
  shipmentQuantityById: {},
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
  shipmentQuantityById$ = this.#state
    .asObservable()
    .pipe(map((state) => state.shipmentQuantityById));
  shipmentMode$: Observable<boolean> = this.#state.pipe(
    map(
      (state) =>
        Object.keys(state.shipmentQuantityById).length > 0 ||
        Object.keys(state.shipmentQuantityById).some(
          (id) => state.shipmentQuantityById[Number(id)] > 0,
        ),
    ),
  );

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
        ...this.initialState,
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

  addShipmentValue(id: number, value: number) {
    const state = this.#state.getValue();

    const maxQuantity = state.entities[id].quantity;

    const newQuantity = Math.min(
      maxQuantity,
      (state.shipmentQuantityById[id] || 0) + value,
    );

    const shipmentQuantityById = {
      ...state.shipmentQuantityById,
      [id]: newQuantity,
    };

    this.#state.next({
      ...state,
      shipmentQuantityById,
    });
  }

  resetShipment() {
    const state = this.#state.getValue();
    this.#state.next({
      ...state,
      shipmentQuantityById: {},
    });
  }

  completeShipment() {
    const state = this.#state.getValue();
    const shipmentItems = Object.keys(state.shipmentQuantityById).map((id) => ({
      id: Number(id),
      quantity: state.shipmentQuantityById[Number(id)],
    }));

    this.productService.completeShipment(shipmentItems).subscribe(() => {
      this.#state.next({
        ...state,
        shipmentQuantityById: {},
      });

      this.loadProducts();
    });
  }
}
