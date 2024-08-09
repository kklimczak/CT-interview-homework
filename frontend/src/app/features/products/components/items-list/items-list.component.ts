import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../list-item/list-item.component';
import { Observable } from 'rxjs';
import { WarehouseItem } from '../../../../core/models/warehouseItem';
import { ProductsState } from '../../state/products.state';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  items$: Observable<WarehouseItem[]> = this.productsState.products$;

  constructor(private productsState: ProductsState) {}

  removeProduct(id: number) {
    this.productsState.removeProduct(id);
  }

  addItemToShipment(id: number): void {
    // this.itemsMockService.addToShipment(id);
  }
}
