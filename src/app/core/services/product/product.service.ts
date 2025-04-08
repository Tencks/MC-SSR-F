import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `http://localhost:3000/api/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductByCod(codProducto: string): Promise<Product>{
    return firstValueFrom(
      this.http.get<Product>(`${this.apiUrl}/codigo/${codProducto}`)
    )
  }

  searchProducts(params: any): Observable<Product[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
    console.log('Search URL:', `${this.apiUrl}`);
    console.log('Search Params:', httpParams.toString());

    return this.http.get<Product[]>(`${this.apiUrl}`, { params: httpParams });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStock(id: string, cantidad: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}/stock`, { cantidad });
  }
}