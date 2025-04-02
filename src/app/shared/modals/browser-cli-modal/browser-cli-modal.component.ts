import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Cliente } from '../../../core/interfaces/cliente.interface';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { ToastService } from '../../../core/services/toasts/toast.service';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-browser-cli-modal',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  templateUrl: './browser-cli-modal.component.html',
  styleUrl: './browser-cli-modal.component.css'
})
export class BrowserCliModalComponent implements OnInit{
@Output() clientSelected = new EventEmitter<any>();
visible: boolean = false;

  //State del Debug logs
  showConsoleLogs: boolean = true;

private searchClienteSubject = new Subject<string>();
searchTerm: string = '';
selectedClient: Cliente | null = null;

clientFilter = {
  cod_cliente: '',
  name: '',
};

hasSearched: boolean = false;

filteredClients: any[] = [];

constructor(
  private clienteService: ClienteService,
  private toastService: ToastService
){}

ngOnInit(): void {
    this.setupSearchCliente();
}

show(){
  this.visible = true;
  this.clearFilters();
  document.body.classList.add('modal-open');
}

hide(){
  this.visible = false;
  document.body.classList.remove('modal-open');
}

//Client Métodos de búsqueda
private setupSearchCliente() {
  this.searchClienteSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.clienteService.searchClientes({ search: term }))
  ).subscribe((results: Cliente[]) => {
   //control flujo de logs en consola
   if (this.showConsoleLogs){
     console.log(results);
   }
   if (results.length === 1){
     this.selectedClient = results[0];
   } else if (results.length > 1){
     this.filteredClients = results;
     this.show();
   }
  });
}

searchCliente(){
 if (this.searchTerm && this.searchTerm.length > 2) {
   this.searchClienteSubject.next(this.searchTerm);
 }
}

searchClients() {
 const filters = {
   ...(this.clientFilter.cod_cliente && { cod_cliente: this.clientFilter.cod_cliente }),
   ...(this.clientFilter.name && { nombre: this.clientFilter.name }),
   ...(this.searchTerm && { search: this.searchTerm })
 };

 this.hasSearched = true;
 this.clienteService.searchClientes(filters).subscribe({
   next: (response: any ) => {
     // Accedemos al array de clientes dentro de la respuesta
     this.filteredClients = response.clientes || [];
     console.log("cuando el length es mas de 0",this.filteredClients);
     if (this.filteredClients.length === 0) {
      console.log("cuando el length igual a 0",this.filteredClients);
      
       this.showAlert('error', 'Sin resultados', 'No encontramos clientes con los criterios de búsqueda especificados');
     }
   },
   error: (error) => {
     console.error('Error al buscar clientes:', error);
     this.filteredClients = [];
     this.showAlert('error', 'Error', 'Error al buscar clientes');
   }
 });
}


// Replace showAlert with:
private showAlert(type: string, title: string, message: string) {
  this.toastService.showToast(
    type as 'success' | 'error' | 'warning' | 'info',
    title,
    message
  );
}

clearFilters() {
 this.clientFilter = {
   cod_cliente: '',
   name: ''
 };
 this.searchTerm = '';
 this.filteredClients = [];
 this.hasSearched = false;
}

selectClient(client: Cliente) {
  this.clientSelected.emit(client);
  this.hide();
}

}
