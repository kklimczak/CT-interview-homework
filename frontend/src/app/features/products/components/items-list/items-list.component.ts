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

  openItemDialog(
    id?: number,
    data?: Omit<WarehouseItem, 'id' | 'imageUrl'>,
  ): void {
    const dialogRef = this.cdkDialog.open<{
      mode: 'Add' | 'Edit';
      values: Omit<WarehouseItem, 'id' | 'imageUrl'>;
    }>(ItemDialogComponent, {
      hasBackdrop: true,
      width: '400px',
      data,
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        const { mode, values } = result;
        if (mode === 'Add') {
          this.productsState.addProduct(values);
        } else if (mode === 'Edit' && id) {
          this.productsState.editProduct(id, values);
          return;
        }
      }
    });
  }

  openAddItemDialog(): void {
    this.openItemDialog();
  }

  openEditItemDialog(item: WarehouseItem): void {
    const { id, imageUrl, ...data } = item;
    this.openItemDialog(id, data);
  }

  removeProduct(id: number) {
    this.productsState.removeProduct(id);
  }

  addItemToShipment(id: number): void {
    // this.itemsMockService.addToShipment(id);
  }
}
