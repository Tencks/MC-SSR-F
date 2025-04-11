import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Proveedor } from '../../interfaces/proveedor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = `http://localhost:3000/api/proveedores`;
  constructor(
    private http: HttpClient
  ) { }

  getProvByCod(codProv: string): Promise<Proveedor> {
    return firstValueFrom(
      this.http.get<Proveedor>(`${this.apiUrl}/codigo/${codProv}`)
    );
  }

  createProv(prov: string):Observable<Proveedor>{
    return this.http.post<Proveedor>(this.apiUrl, prov);
  }


  updateProv(id: string, proveedor: any ): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, proveedor);
  }

  searchProveedores(params: any): Observable<Proveedor[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });

    console.log('Search URL:', `${this.apiUrl}`);
    console.log('Search Params:', httpParams.toString());
    return this.http.get<Proveedor[]>(`${this.apiUrl}`, { params: httpParams });
  }


}
