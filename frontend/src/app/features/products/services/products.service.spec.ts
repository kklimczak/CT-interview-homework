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
});
