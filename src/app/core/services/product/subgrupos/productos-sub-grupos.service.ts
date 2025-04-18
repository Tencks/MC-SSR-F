import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductGrupo, ProductSubGrupo } from '../../../interfaces/product.interface';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosSubGruposService {

  private apiUrl = `http://localhost:3000/api/productsSubgrupos`;
  private apiUrlGrupos = `http://localhost:3000/api/productsGrupos`;

  constructor(private http: HttpClient) { }


  createSubGrupo(subgrupo: ProductSubGrupo): Observable<ProductSubGrupo>{
    return this.http.post<ProductSubGrupo>(this.apiUrl, subgrupo);
  }

  getSubGrupos(params: {
    search?: string;
    codSubGrupo?: string;
    nombre?: string;
    active?: boolean;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  } = {}): Observable<ProductSubGrupo[]>{
    let httpParams = new HttpParams();
    
    console.log('Search URL:', `${this.apiUrl}`);
    console.log('Search Params:', httpParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<ProductSubGrupo[]>(this.apiUrl, { params: httpParams });
  }

 getSubGruposByGrupo(grupoId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/grupo/${grupoId}`)
  }


  updateSubGrupo(id: string, subgrupo: Partial<ProductSubGrupo>): Observable<ProductSubGrupo>{
    return this.http.put<ProductSubGrupo>(`${this.apiUrl}/${id}`, subgrupo);
  }

  deleteSubGrupo(id: string): Observable<{message: string; grupo: ProductSubGrupo}>{
    return this.http.delete<{ message: string; grupo: ProductSubGrupo }>(`${this.apiUrl}/${id}`)
  }

   // Utility method for browser component
   searchSubGruposProductos(params: any): Observable<ProductSubGrupo[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
    console.log('Search URL:', `${this.apiUrl}`);
    console.log('Search Params:', httpParams.toString());

    return this.http.get<ProductSubGrupo[]>(`${this.apiUrl}`, { params: httpParams });
  }

  // Utility method for browser component
  getSubGrupo(id: string): Observable<ProductSubGrupo> {
    return this.http.get<ProductSubGrupo>(`${this.apiUrl}/${id}`);
  }

  getSubGrupoByCod(codSubGrupo: string): Promise <ProductSubGrupo>{
      return firstValueFrom(
        this.http.get<ProductSubGrupo>(`${this.apiUrl}/codigo/${codSubGrupo}`)
      )
      
    }


   // Utility method for browser component
   searchGruposProductos(params: any): Observable<ProductGrupo[]> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
    console.log('Search URL:', `${this.apiUrlGrupos}`);
    console.log('Search Params:', httpParams.toString());

    return this.http.get<ProductGrupo[]>(`${this.apiUrlGrupos}`, { params: httpParams });
  }

  // Utility method for browser component
  getGrupo(id: string): Observable<ProductGrupo> {
    return this.http.get<ProductGrupo>(`${this.apiUrlGrupos}/${id}`);
  }
  // getGrupoByCod(codGrupo: string): Promise <ProductGrupo>{
  //   return firstValueFrom(
  //     this.http.get<ProductGrupo>(`${this.apiUrlGrupos}/codigo/${codGrupo}`)
  //   )
    
  // }

  // Agregar estos métodos al servicio
associateSubgrupoWithGrupo(subgrupoId: string, grupoId: string) {
  return this.http.post<any>(`${this.apiUrl}/subgrupos/associate`, { subgrupoId, grupoId });
}

disassociateSubgrupoFromGrupo(subgrupoId: string, grupoId: string) {
  return this.http.post<any>(`${this.apiUrl}/subgrupos/disassociate`, { subgrupoId, grupoId });
}
}
