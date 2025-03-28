import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParametrosService } from '../../services/parametros/parametros.service';
import Swal from 'sweetalert2';
import { Theme } from '../../core/interfaces/theme.interface';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from '../../services/theme/theme.service';


@Component({
  selector: 'app-config-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './config-modal.component.html',
  styleUrl: './config-modal.component.css'
})
export class ConfigModalComponent {
constructor( private api_params: ParametrosService, private cookieService: CookieService, private themeService: ThemeService){}




ConfigParams() { 
  this.api_params.getParametros().subscribe({
    next: (themes: Theme[]) => {
      let currentSelectedTheme = themes[0];
        const [selectedTheme, setSelectedTheme] = this.createThemeState(themes[0]);
      
      const html = `
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Seleccionar Tema</label>
                <hr>
                <select class="form-control" [(ngModel)]="selectedTheme" styles="background-color:#595656;color:#3F424B">
                  ${themes.map(theme => `
                    <option value="${theme._id}" 
                            ${theme._id === selectedTheme._id ? 'selected' : ''}>
                      ${theme.name}
                    </option>
                  `).join('')}
                </select>
              </div>
              <div class="mt-3">
                <label><small>Previsualización</small></label>
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
        confirmButtonColor:'#40A50E',
        background:'#3F424B' ,
        color: '#fff',
        didOpen: () => {
          const select = document.querySelector('select');
                  
          if (select) {
            select.addEventListener('change', (e) => {
              const target = e.target as HTMLSelectElement;
              const theme = themes.find(t => t._id === target.value);
              if (theme){
                setSelectedTheme(theme);
                currentSelectedTheme = theme;  // Update the outer scope variable

                // const modal = Swal.getPopup();
                // if (modal) {
                //   modal.style.backgroundColor = theme.backgroundColor?.value || '#31343E';
                //   modal.style.color = theme.textColor?.value || '#000000';
                // }
              } 
            });
          }
        }
      }).then(result => {
        if (result.isConfirmed) {
          console.log('Theme selected:', currentSelectedTheme);
          this.themeService.setTheme(currentSelectedTheme);
          
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
      <p><strong>Background:</strong> ${theme.backgroundColor?.name || 'Sin configurar'}</p>
      <p><strong>Text Color:</strong> ${theme.textColor?.name || 'Sin configurar'}</p>
      <p><strong>Language:</strong> ${theme.language?.name || 'Sin configurar'}</p>
      <p><strong>Dark Mode:</strong> ${theme.dark_mode ? 'Yes' : 'No'}</p>
    `;
  }
}


}

