import { TestBed } from '@angular/core/testing';

import { INITIAL_PRODUCT_STATE, ProductsState } from './products.state';
import { ProductsService } from '../services/products.service';
import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

describe('ProductsState', () => {
  let service: ProductsState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: () => of([]),
            removeProduct: (id: number) => of(''),
          },
        },
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(ProductsState);
    expect(service).toBeTruthy();
  });

  it('should load products', () => {
    const scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    service = TestBed.inject(ProductsState);
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

  it('should remove product', () => {
    const scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

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

    // Override the initial state to have products
    TestBed.overrideProvider(INITIAL_PRODUCT_STATE, {
      useValue: {
        ids: [1, 2],
        entities: {
          1: {
            imageUrl: 'http://example.com/image.jpg',
            id: 1,
            name: 'Product 1',
            description: 'Description 1',
            quantity: 10,
            price: 100,
          },
          2: {
            imageUrl: 'http://example.com/image.jpg',
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            quantity: 20,
            price: 200,
          },
        },
        pending: false,
      },
    });

    service = TestBed.inject(ProductsState);

    const id = 1;
    const productsService = TestBed.inject(ProductsService);

    scheduler.run(({ expectObservable, cold }) => {
      const removeProductSpy = spyOn(
        productsService,
        'removeProduct',
      ).and.returnValue(cold('--a|', { a: {} }));

      service.removeProduct(id);

      expectObservable(service.products$).toBe('a-b', {
        a: mockedProducts,
        b: [
          {
            imageUrl: 'http://example.com/image.jpg',
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            quantity: 20,
            price: 200,
          },
        ],
      });

      expect(removeProductSpy).toHaveBeenCalledWith(1);
    });
  });
});
