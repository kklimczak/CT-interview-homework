import { TestBed } from '@angular/core/testing';

import { ProductsState } from './products.state';
import { ProductsService } from '../services/products.service';
import { combineLatest, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

const scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('ProductsState', () => {
  let service: ProductsState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: () => of([]),
          },
        },
      ],
    });
    service = TestBed.inject(ProductsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', () => {
    const mockedProducts = [
      {
        imageUrl: 'http://example.com/image.jpg',
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        quantity: 10,
        price: 100,
      },
      {
        imageUrl: 'http://example.com/image.jpg',
        id: 2,
        name: 'Product 2',
        description: 'Description 2',
        quantity: 20,
        price: 200,
      },
    ];

    const productsService = TestBed.inject(ProductsService);

    scheduler.run(({ expectObservable, cold }) => {
      const getProductsSpy = spyOn(
        productsService,
        'getProducts',
      ).and.returnValue(cold('--a|', { a: mockedProducts }));

      service.loadProducts();

      expectObservable(service.products$).toBe('a-b', {
        a: [],
        b: mockedProducts,
      });
      expectObservable(service.pending$).toBe('a-b', { a: true, b: false });

      expect(getProductsSpy).toHaveBeenCalled();
    });
  });
});
