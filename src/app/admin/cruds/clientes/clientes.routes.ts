import { Routes } from "@angular/router";
import { ClientesCrudComponent } from "./clientes-crud/clientes-crud.component";
import { ClientesGruposComponent } from "./clientes-grupos/clientes-grupos.component";
import { ClientesSubGruposComponent } from "./clientes-sub-grupos/clientes-sub-grupos.component";

export const ClientesRoutes: Routes = [
    
    {
      path: '', redirectTo: 'crud', pathMatch: 'full'
    },
    {
      path: 'crud', component: ClientesCrudComponent
    },
    {
      path: 'grupos', component: ClientesGruposComponent
    },
    {
      path: 'subgrupos', component: ClientesSubGruposComponent
    },
  ];