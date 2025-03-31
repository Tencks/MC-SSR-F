import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Theme } from '../../core/interfaces/theme.interface';
import { ParametrosService } from '../../services/parametros/parametros.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-config-modal-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    DropdownModule
  ],
  template: `
  <p-dialog 
    header="Configuración de Parámetros" 
    [(visible)]="displayModal"
    [modal]="true"
    [style]="{width: '50vw'}"
    [draggable]="false"
    [resizable]="false">
    
    <div class="grid p-fluid">
      <div class="col-12">
        <h5>Seleccionar Tema</h5>
        <p-dropdown 
          [options]="themes" 
          [(ngModel)]="selectedTheme" 
          optionLabel="name"
          (onChange)="onThemeChange($event)"
          [style]="{'width':'100%'}">
        </p-dropdown>
      </div>

      <div class="col-12 mt-3">
        <h5>Previsualización</h5>
        <div class="p-3 border-1 surface-border border-round">
          <p><strong>Background:</strong> {{selectedTheme?.backgroundColor?.name || 'Sin configurar'}}</p>
          <p><strong>Text Color:</strong> {{selectedTheme?.textColor?.name || 'Sin configurar'}}</p>
          <p><strong>Language:</strong> {{selectedTheme?.language?.name || 'Sin configurar'}}</p>
          <p><strong>Dark Mode:</strong> {{selectedTheme?.dark_mode ? 'Yes' : 'No'}}</p>
        </div>
      </div>
    </div>

    <ng-template pTemplate="footer">
      <button pButton label="Cancelar" icon="pi pi-times" (click)="hideModal()" 
              class="p-button-text"></button>
      <button pButton label="Aplicar" icon="pi pi-check" (click)="applyTheme()" 
              class="p-button-text"></button>
    </ng-template>
  </p-dialog>
`
})

export class ConfigModalNewComponent {
  displayModal: boolean = false;
  themes: Theme[] = [];
  selectedTheme: Theme | null = null;

  constructor(
    private parametrosService: ParametrosService,
    private themeService: ThemeService
  ){}

showModal() {
  this.loadThemes();
  this.displayModal= true;
}

hideModal() {
  this.displayModal = false;
}

loadThemes() {
  this.parametrosService.getParametros().subscribe({
    next: (themes: Theme[]) => {
      this.themes = themes;
      this.selectedTheme = themes[0]
    },
    error: (error) =>{
      console.error('Error al cargar tema', error);
    }
  })
}

onThemeChange(event: any) {
  this.selectedTheme = event.value;
  this.updatePreview();
}

updatePreview() {
  if(this.selectedTheme){
    const dialog = document.querySelector('.p-dialog');
    if (dialog){
      (dialog as HTMLElement).style.backgroundColor = this.selectedTheme.backgroundColor?.value || '#ffffff';
      (dialog as HTMLElement).style.color = this.selectedTheme.textColor?.value || '#000000';
    }
  }
}

applyTheme() {
  if (this.selectedTheme){
    this.themeService.setTheme(this.selectedTheme);
    this.hideModal()
  }
}


}
