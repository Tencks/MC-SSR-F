import { Component, OnInit } from '@angular/core';
import { Venta, VentaItem } from '../../../core/interfaces/venta.interface';
import { Product } from '../../../core/interfaces/product.interface';
import { Cliente } from '../../../core/interfaces/cliente.interface';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { VentasService } from '../../../core/services/ventas/ventas.service';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { ProductService } from '../../../core/services/product/product.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-ventas-iva',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CurrencyPipe,
    FormsModule,
    DialogModule,
    ButtonModule,
    TableModule,
    InputTextModule

  ],
  templateUrl: './ventas-iva.component.html',
  styleUrl: './ventas-iva.component.css'
})
export class VentasIVAComponent implements OnInit{

   displayClientModal: boolean = false;
   clientFilter = {
    cod_cliente: '',
    nombre: ''
   };
   filteredClients: Cliente[] = [];

 // Variables para la factura
 numeroFactura: string = '';
 searchTerm: string = '';
 searchProductTerm: string = '';
 selectedClient: Cliente | null = null;
 items: VentaItem[] = [];
 metodoPago: 'efectivo' | 'cuenta corriente' = 'efectivo';
 observaciones: string = '';
 subtotal: number = 0;
 iva: number = 0;
 total: number = 0;
 puntoVenta: string = '00001';

 // Subjects para búsqueda con debounce
 private searchClienteSubject = new Subject<string>();
 private searchProductSubject = new Subject<string>();

 constructor(
   private ventaService: VentasService,
   private clienteService: ClienteService,
   private productService: ProductService,
  
 ) {
   this.setupSearchCliente();
   this.setupSearchProduct();
 }

 ngOnInit(): void {}

 private setupSearchCliente() {
   this.searchClienteSubject.pipe(
     debounceTime(300),
     distinctUntilChanged(),
     switchMap(term => this.clienteService.searchClientes({ search: term }))
   ).subscribe((results: Cliente[]) => {
     // Manejar resultados de búsqueda de clientes
     console.log(results);
   });
 }

 private setupSearchProduct() {
   this.searchProductSubject.pipe(
     debounceTime(300),
     distinctUntilChanged(),
     switchMap(term => this.productService.searchProducts({ search: term }))
   ).subscribe((results: Product[]) => {
     // Manejar resultados de búsqueda de productos
     console.log(results);
   });
 }

 searchCliente() {
   this.searchClienteSubject.next(this.searchTerm);
 }



 selectClient(client: Cliente) {
   this.selectedClient = client;
 }

 addItem(product: Product) {
   const existingItem = this.items.find(item => item.producto === product._id);
   if (existingItem) {
     existingItem.cantidad++;
     existingItem.subtotal = existingItem.cantidad * existingItem.precioUnitario;
   } else {
     const newItem: VentaItem = {
       producto: product._id!,
       cod_producto: product.cod_producto,
       cantidad: 1,
       precioUnitario: product.precioConIva,
       descuento: 0,
       subtotal: product.precioConIva,
       alicuotaIva: product.alicuotaIva
     };
     this.items.push(newItem);
   }
   this.calculateTotals();
 }

 removeItem(item: VentaItem) {
   const index = this.items.indexOf(item);
   if (index > -1) {
     this.items.splice(index, 1);
     this.calculateTotals();
   }
 }

 calculateTotals() {
   this.subtotal = this.items.reduce((acc, item) => {
     item.subtotal = item.cantidad * item.precioUnitario * (1 - item.descuento / 100);
     return acc + item.subtotal;
   }, 0);

   // Calcular IVA basado en la condición del cliente
   const ivaRate = this.selectedClient?.ivaType === 'Responsable Inscripto' ? 0.21 : 0;
   this.iva = this.subtotal * ivaRate;
   this.total = this.subtotal + this.iva;
 }

 guardarBorrador() {
   if (!this.selectedClient) return;
   
   const venta: Venta = {
     ...this.prepareVentaData(),
     estado: 'borrador'
   };
   
   this.ventaService.createVenta(venta).subscribe(
     (response: Venta) => {
       console.log('Borrador guardado', response);
       // Manejar respuesta exitosa
     },
     error  => {
       console.error('Error al guardar borrador', error);
       // Manejar error
     }
   );
 }

 finalizarVenta() {
   if (!this.selectedClient) return;
   
   const venta: Venta = {
     ...this.prepareVentaData(),
     estado: 'completada'
   };
   
   this.ventaService.createVenta(venta).subscribe(
     (response: Venta) => {
       console.log('Venta finalizada', response);
       // Manejar respuesta exitosa
     },
     error => {
       console.error('Error al finalizar venta', error);
       // Manejar error
     }
   );
 }

 private prepareVentaData(): Venta {
   return {
     puntoVenta: this.puntoVenta,
     numeroVenta: this.numeroFactura,
     cliente: this.selectedClient!._id!,
     items: this.items,
     metodoPago: this.metodoPago,
     subtotal: this.subtotal,
     iva: this.iva,
     total: this.total,
     descuentoTotal: 0,
     estadoPago: 'pendiente',
     vendedor: 'current-user-id', // This should come from auth service
     estado: 'borrador',
     observaciones: this.observaciones
   };
 }

 openNewClientModal(){

   console.log("abriendo modal");
 }



searchProduct(){
  if(this.searchTerm){
    this.searchProductSubject.next(this.searchProductTerm);
    console.log('buscamos por cliente colocador en el input ')
    
  } else{
    this.displayClientModal = true;
    this.searchClients();

  }
}

 // Add these new methods for the modal
 searchClients() {
  this.clienteService.searchClientes({
    cod_cliente: this.clientFilter.cod_cliente,
    nombre: this.clientFilter.nombre
  }).subscribe(
    (clients: Cliente[]) => {
      this.filteredClients = clients;
    }
  );
}

clearFilters() {
  this.clientFilter = {
    cod_cliente: '',
    nombre: ''
  };
  this.searchClients();
}

selectClientFromModal(client: Cliente) {
  this.selectedClient = client;
  this.displayClientModal = false;
}


}