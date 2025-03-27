import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Theme } from '../../core/interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private cookieService: CookieService) {}

  initializeTheme() {
    const savedTheme = this.cookieService.get('selectedTheme');
    if (savedTheme) {
      this.applyTheme(JSON.parse(savedTheme));
    }
  }

  applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.style.setProperty('--background-color', theme.backgroundColor?.value || '#ffffff');
    root.style.setProperty('--background-navbar', theme.backgroundNavbar?.value || '#ffffff');
    root.style.setProperty('--background-card', theme.backgroundCard?.value || '#ffffff');
    root.style.setProperty('--text-color', theme.textColor?.value || '#000000');
    // Add other theme properties
  }
}