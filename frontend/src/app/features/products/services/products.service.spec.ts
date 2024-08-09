import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WarehouseItem } from '../../../core/models/warehouseItem';
import { environment } from '../../../../environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const products: WarehouseItem[] = [
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

    service.getProducts().subscribe((data: WarehouseItem[]) => {
      expect(data).toEqual(products);
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/products`,
    );

    expect(req.request.method).toEqual('GET');

    req.flush(products);

    httpTestingController.verify();
  });

  it('should remove product', () => {
    const id = 1;

    service.removeProduct(id).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/products/${id}`,
    );

    expect(req.request.method).toEqual('DELETE');

    req.flush({});

    httpTestingController.verify();
  });

  it('should add product', () => {
    const product: Omit<WarehouseItem, 'id'> = {
      imageUrl: 'http://example.com/image.jpg',
      name: 'Product 1',
      description: 'Description 1',
      quantity: 10,
      price: 100,
    };

    service.addProduct(product).subscribe((data: WarehouseItem) => {
      expect(data).toEqual({ id: 1, ...product });
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/products`,
    );

    expect(req.request.method).toEqual('POST');

    req.flush({ id: 1, ...product });

    httpTestingController.verify();
  });

  it('should edit product', () => {
    const id = 1;
    const product: Omit<WarehouseItem, 'id'> = {
      imageUrl: 'http://example.com/image.jpg',
      name: 'Product 1',
      description: 'Description 1',
      quantity: 10,
      price: 100,
    };

    service.editProduct(id, product).subscribe((data: WarehouseItem) => {
      expect(data).toEqual({ id, ...product });
    });

    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/products/${id}`,
    );

    expect(req.request.method).toEqual('PATCH');

    req.flush({ id, ...product });

    httpTestingController.verify();
  });
});
