import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { EmployeeComponent } from "./components/employee/employee.component";
import { NavbarComponent } from "./shared/navbars/navbar/navbar.component";
import { ThemeService } from './services/theme/theme.service';
import { ThemeContainerComponent } from "./core/themes/theme-container/theme-container.component";
import { OffcanvasComponent } from "./shared/navbars/offcanvas/offcanvas.component";
import { ConfigModalNewComponent } from './shared/config-modal-new/config-modal-new.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
      // NavbarComponent, 
      ThemeContainerComponent,
      // ConfigModalNewComponent,
       OffcanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = `MAGIC'S COMPOLEX - SSR APP`;
  constructor(private themeService: ThemeService, private router: Router){}

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }

  isAuthRoute(): boolean {
    const currentRoute = this.router.url.toLowerCase();
    return currentRoute.includes('/login') || 
           currentRoute.includes('/register') ||
           currentRoute.includes('/404');
  }

}
