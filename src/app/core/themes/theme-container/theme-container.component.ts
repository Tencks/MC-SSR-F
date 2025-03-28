import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-theme-container',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div [ngStyle]="themeStyles$ | async" style="min-height: 105vh;">
      <ng-content></ng-content>
    </div>
  `
})
export class ThemeContainerComponent {
   // Declaramos la propiedad primero
   themeStyles$: any;

  constructor(private themeService: ThemeService) {
  // Creamos un Observable que transformará el tema en estilos CSS
  this.themeStyles$ = this.themeService.theme$.pipe(
  //   map(theme => theme ? {
  //     // Mapeamos las propiedades del tema a variables CSS
  //     '--background-color': theme.backgroundColor?.value || '#ffffff',
  //     '--background-navbar': theme.backgroundNavbar?.value || '#ffffff',
  //     '--background-card': theme.backgroundCard?.value || '#ffffff',
  //     '--text-color': theme.textColor?.value || '#000000'
  //   } : {})
  // );

  map(theme => {
    console.log('Theme received:', theme); // Para debug
    return theme ? {
      '--background-color': theme.backgroundColor?.value || '#ffffff',
      '--background-navbar': theme.backgroundNavbar?.value || '#ffffff',
      '--background-card': theme.backgroundCard?.value || '#ffffff',
      '--text-color': theme.textColor?.value || '#000000',
      'background-color': `var(--background-color)`, // Aplicación directa
      'color': `var(--text-color)` // Aplicación directa
    } : {};
  })
);
}
}