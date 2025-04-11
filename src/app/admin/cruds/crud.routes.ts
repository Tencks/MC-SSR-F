import { ClientesCrudComponent } from "./clientes/clientes-crud/clientes-crud.component";
import { ProductosCrudComponent } from "./productos/productos-crud/productos-crud.component";
import { Routes } from '@angular/router';
import { ProveedoresCrudComponent } from "./proveedores/proveedores-crud/proveedores-crud.component";


export const CRUDS: Routes = [
    
    {
      path: '', redirectTo: 'productos', pathMatch: 'full'
    },
    {
      path: 'productos', component: ProductosCrudComponent
    },
    {
      path: 'clientes', component: ClientesCrudComponent
    },
    {
      path: 'proveedores', component: ProveedoresCrudComponent
    },
  ];