import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {empleadoInterface} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_API = 'http://localhost:3000/api/employes'

  constructor(private http:HttpClient) { }


  getEmployes(){
     
    return this.http.get<empleadoInterface[]>(this.URL_API)
  }

  addEmployee(employee: any) {
    return this.http.post(this.URL_API, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  deleteEmployee(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }


  updateEmployee(_id: string, employee: any) {
    return this.http.put(`${this.URL_API}/${_id}`, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }



}
