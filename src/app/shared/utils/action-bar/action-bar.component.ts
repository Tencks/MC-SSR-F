import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
  <div class="action-bar">
    <button class="btn btn-outline-primary" (click)="onAction('search')" title="Buscar (Ctrl + 1)">
      <i class="bi bi-search"></i>
    </button>
    <button class="btn btn-outline-success" (click)="onAction('create')" title="Nuevo (Ctrl + 2)">
      <i class="bi bi-plus-circle"></i>
    </button>
    <button class="btn btn-outline-danger" (click)="onAction('delete')" title="Eliminar (Ctrl + 3)">
      <i class="bi bi-trash"></i>
    </button>
    <button class="btn btn-primary" (click)="onAction('save')" title="Guardar (Ctrl + 4)">
      <i class="bi bi-save"></i>
    </button>
    <button class="btn btn-secondary" (click)="onAction('cancel')" title="Cancelar (Esc)">
      <i class="bi bi-x-circle"></i>
    </button>
    <button class="btn btn-outline-secondary" (click)="onAction('print')" title="Imprimir (Ctrl + P)">
      <i class="bi bi-printer"></i>
    </button>
    <button class="btn btn-outline-secondary" (click)="onAction('close')" title="Cerrar">
      <i class="bi bi-door-closed"></i>
    </button>
    <button class="btn btn-info" (click)="onAction('info')" title="Info (Ctrl + I)">
      <i class="bi bi-info-circle"></i>
    </button>
  </div>
`,
styles: [`
  .action-bar {
    padding: 10px;
    background: var --background-navbar;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    gap: 5px;
  }
  .btn { min-width: 40px; }
`]
})
export class ActionBarComponent {
  @Input() disabledActions: string[] = [];
  @Output() actionTriggered = new EventEmitter<string>();

  //Debug Logs
  LogsConsole = true;

  constructor(){
    this.setupKeybordShortcuts();
  }

  onAction(action: string) {
    if (!this.disabledActions.includes(action)) {
      this.actionTriggered.emit(action);
      //vemos el log de la accion ejecutada
      if(this.LogsConsole){
        console.log(`Acción ${action} ejecutada`);
      }
    }
  }
  private setupKeybordShortcuts() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
     if (event.target instanceof HTMLInputElement) return;

     switch(event.key){
      case 'Ctrl+I':
        event.preventDefault();
        this.onAction('info');
        break;
      case 'Ctrl+1':
        event.preventDefault();
        this.onAction('search');
        break;
      case 'Ctrl+2':
        event.preventDefault();
        this.onAction('create');
        break;
      case 'Ctrl+3':
        event.preventDefault();
        this.onAction('delete');
        break;  
      case 'Ctrl+4':
        event.preventDefault();
        this.onAction('save');
        break;
      case 'Escape':
        event.preventDefault();
        this.onAction('cancel');
        break;
      case 'Ctrl+P':
        event.preventDefault();
        this.onAction('print');
        break;  
     }
    
    
    })
  }









}
