import { ProductosCrudComponent } from "./productos/productos-crud/productos-crud.component";
import { Routes } from '@angular/router';


export const CRUDS: Routes = [
    
    {
      path: '', redirectTo: 'productos', pathMatch: 'full'
    },
    {
      path: 'productos', component: ProductosCrudComponent
    },
  ];