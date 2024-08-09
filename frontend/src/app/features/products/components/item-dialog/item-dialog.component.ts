import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { positive } from '../../../../core/validators/positive';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from '../input-error/input-error.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { WarehouseItem } from '../../../../core/models/warehouseItem';

@Component({
  selector: 'app-item-dialog',
  standalone: true,
  templateUrl: './item-dialog.component.html',
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent {
  submitButtonLabel: 'Add' | 'Edit' = 'Add';

  itemForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    quantity: [
      1,
      [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')],
    ],
    price: [0.0, [Validators.required, positive()]],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef<{
      mode: 'Add' | 'Edit';
      values: Omit<WarehouseItem, 'id' | 'imageUrl'>;
    }>,
    @Inject(DIALOG_DATA) data: Omit<WarehouseItem, 'id' | 'imageUrl'>,
  ) {
    if (data) {
      this.submitButtonLabel = 'Edit';
      this.itemForm.setValue(data);
    }
  }

  submitForm(): void {
    this.itemForm.markAllAsTouched();
    if (this.itemForm.valid) {
      const { name, description, quantity, price } = this.itemForm.value;
      if (name && description && quantity && price) {
        this.dialogRef.close({
          mode: this.submitButtonLabel,
          values: { name, description, quantity, price },
        });
      }
    }
  }
}
