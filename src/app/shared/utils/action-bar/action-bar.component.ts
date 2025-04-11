import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortcutsService } from '../../../core/services/keybord/shortcuts.service';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <div class="action-bar">
    @if (visibleActions.includes('search')){
      <button class="btn btn-outline-primary" (click)="onAction('search')" title="Buscar (Ctrl + 1)">
        <i class="bi bi-search"></i> Buscar
      </button>
    }

    @if (visibleActions.includes('create')){
      <button class="btn btn-outline-success" (click)="onAction('create')" title="Nuevo (Ctrl + 2)">
        <i class="bi bi-plus-circle"></i> Nuevo
      </button>
    }
    
    @if (visibleActions.includes('delete')){
      
      <button class="btn btn-outline-danger" (click)="onAction('delete')" title="Eliminar (Ctrl + 3)">
        <i class="bi bi-trash"></i> Eliminar
      </button>
    }

    @if (visibleActions.includes('save')){
      <button class="btn btn-primary" (click)="onAction('save')" title="Guardar (Ctrl + 4)">
        <i class="bi bi-save"></i> Guardar
      </button>
    }
    
    @if (visibleActions.includes('cancel')){
      <button class="btn btn-secondary" (click)="onAction('cancel')" title="Cancelar (Esc)">
        <i class="bi bi-x-circle"></i> Cancelar
      </button>
    }
    
    @if (visibleActions.includes('print')){
      <button class="btn btn-outline-secondary" (click)="onAction('print')" title="Imprimir (Ctrl + P)">
        <i class="bi bi-printer"></i> Imprimir
      </button>
    }

    @if (visibleActions.includes('close')){
      <button class="btn btn-outline-secondary" (click)="onAction('close')" title="Cerrar">
        <i class="bi bi-door-closed"></i> Cerrar
      </button>
    }
    
    @if (visibleActions.includes('info')){
      <button class="btn btn-info" (click)="onAction('info')" title="Info (Ctrl + I)">
        <i class="bi bi-info-circle"></i> 
      </button>
    }
    
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
  @Input() visibleActions: string[] = ['search', 'create', 'delete', 'save', 'cancel', 'print', 'close', 'info'];

  @Output() actionTriggered = new EventEmitter<string>();

  //Debug Logs
  LogsConsole = true;

  constructor(
    // private shotcutService: ShortcutsService
  ){
    this.setupKeybordShortcuts();
    // this.registerShortcuts();
  }


  onAction(action: string) {
    if (!this.disabledActions.includes(action)) {
            this.actionTriggered.emit(action);
      //vemos el log de la accion ejecutada
      if(this.LogsConsole){
        console.log(`Acción ${action} ejecutada`);
      }
    }else{
      if(this.LogsConsole){
        console.log(`Acción ${action} deshabilitada`);
      }
    }
  }
  private setupKeybordShortcuts() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
     if (event.target instanceof HTMLInputElement) return;

     
      if( event.key === 'Escape'){
        event.preventDefault();
        this.onAction('cancel');
        return;
      }

      if (event.shiftKey){
        switch(event.key){
          case 'b':
          case 'B':
            event.preventDefault();
            this.onAction('search');
            break;

          case 'i':
          case 'I':
            event.preventDefault();
            this.onAction('info');
            break;
          case 'n':
          case 'N':
            event.preventDefault();
            this.onAction('create');
            break;
          
          case 'c':
          case 'C':
            event.preventDefault();
            this.onAction('delete');
            break;

          case 's':
          case 'S':
            event.preventDefault();
            this.onAction('save');
            break;  

          case 'p':
          case 'P':
            event.preventDefault();
            this.onAction('print');
            break;  

          // case 'x':
          // case 'X':
          //   event.preventDefault();
          //   this.onAction('close');
          //   break;  
           }
        }
      })
     
  }

  

//   private registerShortcuts() {
//   const shortcuts = [
//       { keys: 'Ctrl+1', action: () => this.onAction('search') },
//       { keys: 'Ctrl+2', action: () => this.onAction('create') },
//       { keys: 'Ctrl+3', action: () => this.onAction('delete') },
//       { keys: 'Ctrl+4', action: () => this.onAction('save') },
//       { keys: 'Ctrl+P', action: () => this.onAction('print') },
//       { keys: 'Ctrl+I', action: () => this.onAction('info') },
//       { keys: 'Escape', action: () => this.onAction('cancel') },
//   ]
  
//   shortcuts.forEach( s => this.shotcutService.registerShortcut(s.keys, s.action));
// }

}
