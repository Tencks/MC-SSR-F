import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosSubGruposService {

  private apiUrl = `http://localhost:3000/api/products/subgrupos`;

  constructor(private http: HttpClient) { }
}
