import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  URL_API = 'http://localhost:3000/api/parametros'

  constructor(private http:HttpClient) { }


  getParametros(){
     
    return this.http.get<any[]>(this.URL_API)
  }

}
