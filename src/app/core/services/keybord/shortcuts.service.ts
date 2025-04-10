import { Injectable, OnDestroy } from '@angular/core';

interface shortcut{
  keys: string,
  action: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService implements OnDestroy{
  private shortcuts: shortcut[] = [];

  //DEJAMOS CONSTANCIA DE SU EXISTENCIA PERO VA A ESTAR DESHABILITADO POR EL MOMENTO
  //NO SE USA EN EL PROYECTO ACTUALMENTE PORQUE NO SE HA PROBADO EN PRODUCCION

  constructor(){
    document.addEventListener('keydown', this.handleKeydown);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  registerShortcut(keys:string, action: () => void): void {
    this.shortcuts.push({ keys, action})
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const tag = (event.target as HTMLElement).tagName;

    if(['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)){
      return; //evitamos los conflictos con los inputs de entrada
    }

    //example: entra => ['Ctrl','','','1']
    const keyCombo =[
      event.ctrlKey ? 'Ctrl' : '',
      event.altKey ? 'Alt' : '',
      event.shiftKey ? 'Shift' : '',
      event.key.length === 1 ? event.key.toUpperCase() : event.key //example: '1', 'A', 'Escape'
    ]
    .filter( k => k) //elimina los valores falsy (como '') del array
    .join('+'); //junta los valores del array en una cadena separada por '+'

    const shortcut = this.shortcuts.find( s => s.keys === keyCombo)
    if(shortcut){
      event.preventDefault(); // Evitamos la accion predeterminada del navegador
      event.stopPropagation(); // Stop event bubbling
      shortcut.action();
    }
    //example: sale => ['Ctrl+1']
  }
}
