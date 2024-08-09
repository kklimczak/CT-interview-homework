import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BehaviorSubject, map } from 'rxjs';
import { WarehouseItem } from '../../../core/models/warehouseItem';
import { EntityState } from '../../../shared/models/entity-state';

export interface ProductState extends EntityState<WarehouseItem> {
  pending: boolean;
}

const initialState: ProductState = {
  ids: [],
  entities: {},
  pending: false,
};

@Injectable({
  providedIn: 'root',
})
export class ProductsState {
  constructor(private productService: ProductsService) {}

  #state: BehaviorSubject<ProductState> = new BehaviorSubject(initialState);

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
}
