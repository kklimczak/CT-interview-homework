import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { ListItemComponent } from '../list-item/list-item.component';
import { WarehouseItem } from '../../../../core/models/warehouseItem';
import { ProductsState } from '../../state/products.state';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, DialogModule, ListItemComponent],
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  items$: Observable<WarehouseItem[]> = this.productsState.products$;

  constructor(
    private productsState: ProductsState,
    private cdkDialog: Dialog,
  ) {}

  openAddItemDialog(): void {
    const dialogRef = this.cdkDialog.open<
      Omit<WarehouseItem, 'id' | 'imageUrl'>
    >(ItemDialogComponent, {
      hasBackdrop: true,
      width: '400px',
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.productsState.addProduct(result);
      }
    });
  }

  removeProduct(id: number) {
    this.productsState.removeProduct(id);
  }

  addItemToShipment(id: number): void {
    // this.itemsMockService.addToShipment(id);
  }
}
