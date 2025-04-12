
import { Routes } from '@angular/router';
import { ProductosCrudComponent } from './productos-crud/productos-crud.component';
import { ProductosGruposComponent } from './productos-grupos/productos-grupos.component';
import { ProductosSubGruposComponent } from './productos-sub-grupos/productos-sub-grupos.component';



export const ProductosRoutes: Routes = [
    
    {
      path: '', redirectTo: 'productos', pathMatch: 'full'
    },
    {
      path: 'productos', component: ProductosCrudComponent
    },
    {
      path: 'grupos', component: ProductosGruposComponent
    },
    {
      path: 'subgrupos', component: ProductosSubGruposComponent
    },
  ];