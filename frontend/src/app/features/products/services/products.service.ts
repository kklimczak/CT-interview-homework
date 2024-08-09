import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WarehouseItem } from '../../../core/models/warehouseItem';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<WarehouseItem[]>(`${this.apiUrl}/products`);
  }

  removeProduct(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/products/${id}`);
  }

  addProduct(product: Omit<WarehouseItem, 'id'>) {
    return this.httpClient.post<WarehouseItem>(
      `${this.apiUrl}/products`,
      product,
    );
  }

  editProduct(id: number, product: Omit<WarehouseItem, 'id'>) {
    return this.httpClient.patch<WarehouseItem>(
      `${this.apiUrl}/products/${id}`,
      product,
    );
  }
}
