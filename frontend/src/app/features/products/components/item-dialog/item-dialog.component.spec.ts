import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDialogComponent } from './item-dialog.component';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { ReactiveFormsModule } from '@angular/forms';

describe('ItemDialogComponent', () => {
  let component: ItemDialogComponent;
  let fixture: ComponentFixture<ItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDialogComponent, ReactiveFormsModule],
      providers: [
        {
          provide: DialogRef,
          useValue: {
            close: () => {},
          },
        },
        {
          provide: DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
