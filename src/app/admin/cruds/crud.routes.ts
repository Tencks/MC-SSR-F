import { ClientesCrudComponent } from "./clientes/clientes-crud/clientes-crud.component";
import { ProductosCrudComponent } from "./productos/productos-crud/productos-crud.component";
import { Routes } from '@angular/router';
import { ProveedoresCrudComponent } from "./proveedores/proveedores-crud/proveedores-crud.component";
import { AuthGuard } from "../../core/guards/auth.guard";


export const CRUDS: Routes = [
    
    {
      path: '', redirectTo: 'productos', pathMatch: 'full'
    },
    {
      path: 'productos', 
      loadChildren: () => import('./../cruds/productos/productos.routes').then (m => m.ProductosRoutes),
      canActivate: [AuthGuard]
    },  
    {
      path: 'clientes', 
      loadChildren: () => import('../cruds/clientes/clientes.routes').then (m => m.ClientesRoutes),
      canActivate: [AuthGuard]
    },
    {
      path: 'proveedores', component: ProveedoresCrudComponent
    },
  ];