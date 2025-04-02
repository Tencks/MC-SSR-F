import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParametrosService } from '../../../services/parametros/parametros.service';
import Swal from 'sweetalert2';
import { Theme } from '../../../core/interfaces/theme.interface';
import { CookieService } from 'ngx-cookie-service';
import { ThemeService } from '../../../services/theme/theme.service';


@Component({
  selector: 'app-config-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
<!-- Modal Bootstrap -->
<div class="modal fade" [class.show]="displayModal" [style.display]="displayModal ? 'block' : 'none'" tabindex="-1" role="dialog" aria-labelledby="configModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="configModalLabel">Configuración de Parámetros</h5>
        <button type="button" class="btn-close" aria-label="Close" (click)="hideModal()"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row mb-3">
            <div class="col-12">
              <h5>Seleccionar Tema</h5>
              <select class="form-select" [(ngModel)]="selectedTheme" (change)="onThemeChange($event)">
                <option *ngFor="let theme of themes" [ngValue]="theme">{{ theme.name }}</option>
              </select>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-12">
              <h5>Previsualización</h5>
              <div class="p-3 border rounded">
                <p><strong>Background:</strong> {{selectedTheme?.backgroundColor?.name || 'Sin configurar'}}</p>
                <p><strong>Text Color:</strong> {{selectedTheme?.textColor?.name || 'Sin configurar'}}</p>
                <p><strong>Language:</strong> {{selectedTheme?.language?.name || 'Sin configurar'}}</p>
                <p><strong>Dark Mode:</strong> {{selectedTheme?.dark_mode ? 'Yes' : 'No'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="hideModal()">
          <i class="bi bi-x"></i> Cancelar
        </button>
        <button type="button" class="btn btn-primary" (click)="applyTheme()">
          <i class="bi bi-check"></i> Aplicar
        </button>
      </div>
    </div>
  </div>
</div>
<!-- Backdrop para el modal -->
<div class="modal-backdrop fade show" *ngIf="displayModal"></div>
`
})

export class ConfigModalComponent {

displayModal: boolean = false;
themes: Theme[] = [];
selectedTheme: Theme | null = null;

constructor(
  private parametrosService: ParametrosService,
  private themeService: ThemeService
){}

showModal() {
  this.loadThemes();
  this.displayModal = true;
  document.body.classList.add('modal-open'); // Previene el scroll del body
}

hideModal() {
  this.displayModal = false;
  document.body.classList.remove('modal-open'); // Restaura el scroll del body
}

loadThemes() {
  this.parametrosService.getParametros().subscribe({
    next: (themes: Theme[]) => {
      this.themes = themes;
      this.selectedTheme = themes[0];
      this.updatePreview();
    },
    error: (error) => {
      console.error('Error al cargar tema', error);
    }
  });
}

onThemeChange(event: any) {
  // En Bootstrap, necesitamos obtener el valor seleccionado de manera diferente
  this.updatePreview();
}

updatePreview() {
  if(this.selectedTheme){
    const modalContent = document.querySelector('.modal-content');
    if (modalContent){
      (modalContent as HTMLElement).style.backgroundColor = this.selectedTheme.backgroundColor?.value || '#ffffff' ;
      (modalContent as HTMLElement).style.color = this.selectedTheme.textColor?.value || '#000000';
    }
  }
}

applyTheme() {
  if (this.selectedTheme){
    this.themeService.setTheme(this.selectedTheme);
    this.hideModal();
  }
}
}