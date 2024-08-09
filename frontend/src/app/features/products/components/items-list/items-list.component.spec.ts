import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListComponent } from './items-list.component';
import { ProductsState } from '../../state/products.state';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsListComponent],
      providers: [
        {
          provide: ProductsState,
          useValue: {
            loadProducts: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
