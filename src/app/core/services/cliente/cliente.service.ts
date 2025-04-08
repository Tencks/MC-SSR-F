import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Client } from '../../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = `http://localhost:3000/api/clientes`;

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getCliente(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  getClientByCod(codCliente: string): Promise<Client> {
    return firstValueFrom(
      this.http.get<Client>(`${this.apiUrl}/codigo/${codCliente}`)
    );
  }

  searchClientes(params: any): Observable<Client[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
    return this.http.get<Client[]>(`${this.apiUrl}`, { params: httpParams });
  }

  createCliente(cliente: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, cliente);
  }

  updateCliente(id: string, cliente: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, cliente);
  }

  deleteCliente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}