import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParametrosService } from '../../services/parametros/parametros.service';
import Swal from 'sweetalert2';
import { Theme } from '../../core/interfaces/theme.interface';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-config-modal',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './config-modal.component.html',
  styleUrl: './config-modal.component.css'
})
export class ConfigModalComponent {
constructor( private api_params: ParametrosService, private cookieService: CookieService){}


// ConfigParams(){ 
//   this.api_params.getParametros().subscribe({
//     next: (themes: any[]) => {
//       let html = `
//         <div class="container">
//           <div class="row">
//             <div class="col-md-12">
//               <div class="form-group">
//                 <label>Select Theme</label>
//                 <select id="themeSelect" class="form-control">
//                   ${themes.map(theme => `
//                     <option value="${theme._id}">${theme.name}</option>
//                   `).join('')}
//                 </select>
//               </div>
//               <div class="mt-3">
//                 <small class="text-muted">Preview of selected theme:</small>
//                 <div class="p-3 mt-2 border rounded">
//                   <p><strong>Background:</strong> ${themes[0].backgroundColor?.value || 'Not set'}</p>
//                   <p><strong>Text Color:</strong> ${themes[0].textColor?.value || 'Not set'}</p>
//                   <p><strong>Language:</strong> ${themes[0].language?.name || 'Not set'}</p>
//                   <p><strong>Dark Mode:</strong> ${themes[0].dark_mode ? 'Yes' : 'No'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;

//       Swal.fire({
//         title: "Configuración de Parametros",
//         icon: "info",
//         html: html,
//         showCloseButton: true,
//         showCancelButton: true,
//         focusConfirm: false,
//         confirmButtonText: `<i class="bi bi-check-lg"> Aplicar</i>`,
//         confirmButtonAriaLabel: "Aplicar cambios",
//         cancelButtonText: `<i class="bi bi-x-lg"> Cancelar</i>`,
//         cancelButtonAriaLabel: "Cancelar",
//         cancelButtonColor: '#E52020',
//         confirmButtonColor:'#91f071',
        
//       }).then(result => {
//         if (result.isConfirmed) {
//           console.log('Nuevos parámetros:', result  );
//         }
//       });
//     },
//     error: (error) => {
//       console.error('Error al obtener parámetros:', error);
//     }
//   });
// }

ConfigParams() { 
  this.api_params.getParametros().subscribe({
    next: (themes: Theme[]) => {
      let currentSelectedTheme = themes[0];  // Create a variable in this scope
      const [selectedTheme, setSelectedTheme] = this.createThemeState(themes[0]);
      
      const html = `
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Seleccionar Tema</label>
                <select class="form-control" [(ngModel)]="selectedTheme">
                  ${themes.map(theme => `
                    <option value="${theme._id}" 
                            ${theme._id === selectedTheme._id ? 'selected' : ''}>
                      ${theme.name}
                    </option>
                  `).join('')}
                </select>
              </div>
              <div class="mt-3">
                <small class="text-muted">Previsualización</small>
                <div class="p-3 mt-2 border rounded">
                  <p><strong>Background:</strong> ${selectedTheme.backgroundColor?.name || 'Not set'} </p>
                  <p><strong>Text Color:</strong> ${selectedTheme.textColor?.name || 'Not set'} </p>
                  <p><strong>Language:</strong> ${selectedTheme.language?.name || 'Not set'} </p>
                  <p><strong>Dark Mode:</strong> ${selectedTheme.dark_mode ? 'Yes' : 'No'} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      Swal.fire({
        title: "Configuración de Parametros",
        html: html,
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `<i class="bi bi-check-lg"> Aplicar</i>`,
        confirmButtonAriaLabel: "Aplicar cambios",
        cancelButtonText: `<i class="bi bi-x-lg"> Cancelar</i>`,
        cancelButtonAriaLabel: "Cancelar",
        cancelButtonColor: '#E52020',
        confirmButtonColor:'#91f071',
        didOpen: () => {
          const select = document.querySelector('select');
          if (select) {
            select.addEventListener('change', (e) => {
              const target = e.target as HTMLSelectElement;
              const theme = themes.find(t => t._id === target.value);
              if (theme){
                setSelectedTheme(theme);
                currentSelectedTheme = theme;  // Update the outer scope variable
              } 
            });
          }
        }
      }).then(result => {
        if (result.isConfirmed) {
          console.log('Theme selected:', currentSelectedTheme);
          this.saveTheme(currentSelectedTheme);
        }
      });
    },
    error: (error) => {
      console.error('Error al obtener parámetros:', error);
    }
  });
}

private createThemeState(initialTheme: Theme): [Theme, (theme: Theme) => void] {
  let currentTheme = initialTheme;
  const setTheme = (theme: Theme) => {
    currentTheme = theme;
    this.updatePreview(currentTheme);
  };
  return [currentTheme, setTheme];
}

private updatePreview(theme: Theme) {
  const preview = document.querySelector('.border.rounded');
  if (preview) {
    preview.innerHTML = `
      <p><strong>Background:</strong> ${theme.backgroundColor?.name || 'Not set'}</p>
      <p><strong>Text Color:</strong> ${theme.textColor?.name || 'Not set'}</p>
      <p><strong>Language:</strong> ${theme.language?.name || 'Not set'}</p>
      <p><strong>Dark Mode:</strong> ${theme.dark_mode ? 'Yes' : 'No'}</p>
    `;
  }
}

private saveTheme(theme: Theme) {
  // Save theme in cookie (30 days expiration)
  this.cookieService.set('selectedTheme', JSON.stringify(theme), 30);
  this.applyTheme(theme);
}

private applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty('--background-color', theme.backgroundColor?.value || '#ffffff');
  root.style.setProperty('--background-navbar', theme.backgroundNavbar?.value || '#ffffff');
    root.style.setProperty('--background-card', theme.backgroundCard?.value || '#ffffff');
    root.style.setProperty('--text-color', theme.textColor?.value || '#000000');
  // Add any other theme properties you want to apply
}

}

