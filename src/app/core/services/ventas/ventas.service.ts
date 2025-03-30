import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = `http://localhost:3000/api/ventas`;

  constructor(private http: HttpClient) { }

  createVenta(venta: any): Observable<any> {
    return this.http.post(this.apiUrl, venta);
  }

  getVentas(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  getVenta(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateVenta(id: string, venta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, venta);
  }

  updateEstadoPago(id: string, estadoPago: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/estado-pago`, { estadoPago });
  }

  cancelarVenta(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, {});
  }
}