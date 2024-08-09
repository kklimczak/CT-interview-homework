import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsState } from './state/products.state';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        {
          provide: ProductsState,
          useValue: {
            loadProducts: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts on init', () => {
    const productsState = TestBed.inject(ProductsState);
    const loadProductsSpy = spyOn(productsState, 'loadProducts');

    component.ngOnInit();

    expect(loadProductsSpy).toHaveBeenCalled();
  });
});
