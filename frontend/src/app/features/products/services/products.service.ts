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
}
