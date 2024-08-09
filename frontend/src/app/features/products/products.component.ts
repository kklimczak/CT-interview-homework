import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseItem } from '../../core/models/warehouseItem';
import { ProductsState } from './state/products.state';
import { ItemsListComponent } from './components/items-list/items-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [ItemsListComponent],
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productsState: ProductsState) {}

  ngOnInit() {
    this.productsState.loadProducts();
  }
}
