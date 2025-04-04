import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFound404Component } from './components/error/not-found404/not-found404.component';
import { ComprasContainerComponent } from './components/compras/compras-container/compras-container.component';
import { StockContainerComponent } from './components/stock/stock-container/stock-container.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RegisterComponent } from './components/admin/register/register.component';
import { ProductosContainerComponent } from './components/productos/productos-container/productos-container.component';
import { EmployeeComponent } from './components/employee/employee.component'; //temporal
import { AuthGuard } from './core/guards/auth.guard';
import { VentasHomeComponent } from './components/ventas/ventas-home/ventas-home.component';
import { VentasIVAComponent } from './components/ventas/ventas-iva/ventas-iva.component';
import { VentasSIVAComponent } from './components/ventas/ventas-siva/ventas-siva.component';
import { UserProfileComponent } from './components/Usuario/user-profile/user-profile.component';
// import { EmpleadosComponent } from './components/otros/empleados/empleados.component';

export const routes: Routes = [
  // {
  //   path: '*', redirectTo: '', pathMatch: 'full'
  // },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent 
  },
  {
    path: 'register', component: RegisterComponent
  },
  // Rutas protegidas
  {
    path: 'ventas', 
    component: VentasHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ventasIVA', 
    component: VentasIVAComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ventasSIVA', 
    component: VentasSIVAComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'compras', 
    component: ComprasContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stock', 
    component: StockContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashbord', 
    component: DashbordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos', 
    component: ProductosContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile', 
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'empleados', 
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: 'crud', 
    loadChildren: () => import('./admin/cruds/crud.routes').then (m => m.CRUDS),
    canActivate: [AuthGuard]
  },  
  {
    path: '404', 
    component: NotFound404Component,
  },
  {
    path: '**', redirectTo: '404',
    pathMatch: 'full' 
  }
];