import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionBarComponent } from '../../utils/action-bar/action-bar.component';
import { ToastService } from '../../../core/services/toasts/toast.service';
import { lastValueFrom } from 'rxjs';

interface FilterConfig{
  key: string,
  label: string,
  type: 'text' | 'number' | 'select' | 'boolean',
  options?: { value: any , label: string }[];
}
interface ColumnConfig{
  key: string,
  label: string,
  type?: 'text' | 'number' | 'date' | 'boolean',
  format?: string
}


@Component({
  selector: 'app-browser-generic',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActionBarComponent
  ],
  templateUrl: './browser-generic.component.html',
  styleUrl: './browser-generic.component.css'
})
export class BrowserGenericComponent implements OnInit{
@Input() title: string = 'Búsqueda';
@Input() filtersConfig: FilterConfig[] = [];
@Input() columnsConfig: ColumnConfig[] = [];
@Input() service: any; // ????
@Input() searchMethod: string = 'search';
@Input() selectedItemMethod: string = 'get';

@Output() itemSelected = new EventEmitter<any>();
@Output() modalClosed = new EventEmitter<void>(); 

visible: boolean = false;
filters: { [key: string]: any } = {};
items: any[] = [];
hasSearched: boolean = false;

constructor(
  private toastService: ToastService
){}

  ngOnInit(): void {
    this.initializeFilters();
  }

private initializeFilters(){
  this.filtersConfig.forEach(filter => {
    this.filters[filter.key] = '';
  });
}

show(){
  this.visible = true;
  document.body.classList.add('modal-open');
}

hide(){
  this.visible = false;
  document.body.classList.remove('modal-open');
  this.modalClosed.emit();
}

search(){
  const activeFilters = Object.entries(this.filters).reduce((acc, [key, value]) => {
    if (value) acc[key] = value;
    return acc;
  }, {} as { [key: string]: any });

  console.log('Filtros activos:', activeFilters);

  this.hasSearched = true;
  if (this.service && typeof this.service[this.searchMethod] === 'function') {
    this.service[this.searchMethod](activeFilters).subscribe({
    next: (response: any) =>{
      this.items = Array.isArray(response) ? response : response.items || [];
      console.log('Resultados de búsqueda:', this.items);
      
      if(this.items.length === 0){
        this.toastService.showToast('warning', 'Sin resultados', 'No encontramos registros');
      }
    },
    error: (error: any) =>{
      console.error('Error en la búsqueda:', error);
      this.toastService.showToast('error', 'Error en la búsqueda', 'Ocurrió un error en la búsqueda');
    }
  });
} else {
  console.error(`Method ${this.searchMethod} not found in service`);
    this.toastService.showToast('error', 'Error', 'Método de búsqueda no encontrado');
}
}

clearFilters(){
  this.initializeFilters();
  this.hasSearched = false;
  this.items = [];
}


async selectItem(item: any) { // Fixed typo in method name (was selectecItem)
  try {
    if(this.service && typeof this.service[this.selectedItemMethod] === 'function'){
      // toPromise() is deprecated, let's use lastValueFrom instead
      const fullItem = await lastValueFrom(this.service[this.selectedItemMethod](item._id));
      this.itemSelected.emit(fullItem);
      this.clearFilters();
      this.hide();
      console.log('Item seleccionado:', fullItem);
      this.toastService.showToast('info', 'Recuperado', 'Item recuperado correctamente');
    } else {
      console.error(`Method ${this.selectedItemMethod} not found in service`);
      this.toastService.showToast('error', 'Error', 'Método de selección no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener datos completos:', error);
    this.toastService.showToast('error', 'Error', 'Error al obtener datos completos del item');
  }
}

handleAction(action:string){
  switch(action){
    case 'search':
      this.search();
      break;
    case 'cancel':
      this.clearFilters();
      break;
    case 'close':
      this.hide();
      break;    
  }
}








}
