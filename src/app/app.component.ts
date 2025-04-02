import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { ThemeService } from './services/theme/theme.service';
import { ThemeContainerComponent } from "./core/themes/theme-container/theme-container.component";
import { OffcanvasComponent } from "./shared/navbars/offcanvas/offcanvas.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
      ThemeContainerComponent,
       OffcanvasComponent
      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = `MAGIC'S COMPOLEX - SSR APP`;
  constructor(
    private themeService: ThemeService,
    private router: Router,
    ){}

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
