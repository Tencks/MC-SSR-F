import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Theme } from '../../core/interfaces/theme.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // BehaviorSubject es un tipo especial de Observable que mantiene el último valor emitido
  // y lo emite inmediatamente a los nuevos suscriptores
  private currentTheme = new BehaviorSubject<Theme | null>(null);
   // Exponemos el Observable para que los componentes puedan suscribirse a los cambios del tema
  // pero no puedan modificar directamente el BehaviorSubject
  theme$ = this.currentTheme.asObservable();

  constructor(private cookieService: CookieService) 
  {
    // Cargamos el tema guardado al iniciar el servicio
    this.loadThemeFromCookie();
  }

 // Método público para inicializar el tema
 initializeTheme() {
  this.loadThemeFromCookie();
}

// Método privado para cargar el tema desde las cookies
private loadThemeFromCookie() {
  const savedTheme = this.cookieService.get('selectedTheme');
  if (savedTheme) {
    this.setTheme(JSON.parse(savedTheme));
  }
}

// Método público para establecer un nuevo tema
  // Este método será llamado cuando el usuario seleccione un nuevo tema
  setTheme(theme: Theme) {
    // Actualizamos el BehaviorSubject con el nuevo tema
    // Esto notificará automáticamente a todos los componentes suscritos
    this.currentTheme.next(theme);
    
    // Guardamos el tema en las cookies para persistencia
    this.cookieService.set('selectedTheme', JSON.stringify(theme), 30); // 30 días de expiración
  }
}



//ESTO MODIFICA DIRECTAMENTE EL DOM Y LO REEMPLAZAMOS POR ALGO MÁS FAMILYFRIENDLY

  // initializeTheme() {
  //   const savedTheme = this.cookieService.get('selectedTheme');
  //   if (savedTheme) {
  //     this.applyTheme(JSON.parse(savedTheme));
  //   }
  // }

  // applyTheme(theme: Theme) {
  //   const root = document.documentElement;
  //   root.style.setProperty('--background-color', theme.backgroundColor?.value || '#ffffff');
  //   root.style.setProperty('--background-navbar', theme.backgroundNavbar?.value || '#ffffff');
  //   root.style.setProperty('--background-card', theme.backgroundCard?.value || '#ffffff');
  //   root.style.setProperty('--text-color', theme.textColor?.value || '#000000');
  //   // Add other theme properties
  // }




