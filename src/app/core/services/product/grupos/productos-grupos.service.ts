import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductGrupo } from '../../../interfaces/product.interface';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosGruposService {

  private apiUrl = `http://localhost:3000/api/productsGrupos`;

  constructor(private http: HttpClient) { }

  createGrupo(grupo: ProductGrupo): Observable<ProductGrupo>{
    return this.http.post<ProductGrupo>(this.apiUrl, grupo);
  }

  getGrupos(params: {
    search?: string;
    codGrupo?: string;
    nombre?: string;
    active?: boolean;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  } = {}): Observable<ProductGrupo[]>{
    let httpParams = new HttpParams();
    
    console.log('Search URL:', `${this.apiUrl}`);
    console.log('Search Params:', httpParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<ProductGrupo[]>(this.apiUrl, { params: httpParams });
  }
  
 getGrupoByCod(codGrupo: string): Promise <ProductGrupo>{
    return firstValueFrom(
      this.http.get<ProductGrupo>(`${this.apiUrl}/codigo/${codGrupo}`)
    )
    
  }



  updateGrupo(id: string, grupo: Partial<ProductGrupo>): Observable<ProductGrupo>{
    return this.http.put<ProductGrupo>(`${this.apiUrl}/${id}`, grupo);
  }

  deleteGrupo(id: string): Observable<{message: string; grupo: ProductGrupo}>{
    return this.http.delete<{ message: string; grupo: ProductGrupo }>(`${this.apiUrl}/${id}`)
  }

   // Utility method for browser component
   searchGruposProductos(params: any): Observable<ProductGrupo[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
    console.log('Search URL:', `${this.apiUrl}`);
    console.log('Search Params:', httpParams.toString());

    return this.http.get<ProductGrupo[]>(`${this.apiUrl}`, { params: httpParams });
  }

  // Utility method for browser component
  getGrupo(id: string): Observable<ProductGrupo> {
    return this.http.get<ProductGrupo>(`${this.apiUrl}/${id}`);
  }
  
  associateSubgrupoWithGrupo(subgrupoId: string, grupoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/associate`, { subgrupoId, grupoId });
  }

  dissociateSubgrupoFromGrupo(subgrupoId: string, grupoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/dissociate`, { subgrupoId, grupoId });
  }

}
