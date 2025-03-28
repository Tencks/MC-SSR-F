import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeComponent } from "./components/employee/employee.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { ThemeService } from './services/theme/theme.service';
import { ThemeContainerComponent } from "./core/themes/theme-container/theme-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeeComponent, NavbarComponent, ThemeContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = `MAGIC'S COMPOLEX - SSR APP`;
  constructor(private themeService: ThemeService){}

  ngOnInit(): void {
    this.themeService.initializeTheme();
  }


}
