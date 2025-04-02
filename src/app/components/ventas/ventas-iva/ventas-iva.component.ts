import { Component, OnInit, ViewChild } from '@angular/core';
import { Venta, VentaItem } from '../../../core/interfaces/venta.interface';
import { Product } from '../../../core/interfaces/product.interface';
import { Cliente } from '../../../core/interfaces/cliente.interface';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { VentasService } from '../../../core/services/ventas/ventas.service';
import { ClienteService } from '../../../core/services/cliente/cliente.service';
import { ProductService } from '../../../core/services/product/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BrowserCliModalComponent } from '../../../shared/modals/browser-cli-modal/browser-cli-modal.component';
import { BrowserProdModalComponent } from "../../../shared/modals/browser-prod-modal/browser-prod-modal.component";
import { ToastService } from '../../../core/services/toasts/toast.service';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-ventas-iva',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CurrencyPipe,
    ToastrModule,
    ReactiveFormsModule,
    BrowserCliModalComponent,
    BrowserProdModalComponent,
],
  templateUrl: './ventas-iva.component.html',
  styleUrl: './ventas-iva.component.css'
})
export class VentasIVAComponent implements OnInit{
  @ViewChild('browserCliModal') browserCliModal!: BrowserCliModalComponent;

  @ViewChild('browserProdModal') browserProdModal!: BrowserProdModalComponent;

  //State del Debug logs
  showConsoleLogs: boolean = true;

  //Estado Incial de los Modals en false para que no se vean
  displayClientModal: boolean = false;
  displayProductModal: boolean = false;

  //Filtros Iniciales en vacio
  clientFilter = {
    cod_cliente: '',
    nombre: ''
   };

  productFilter = {
    cod_producto: '',
    nombre: ''
  };

  //Resultados de la busqueda de clientes y productos
  filteredClients: Cliente[] = [];
  filteredProducts: Product[] = [];

 // Variables para la factura
 numeroFactura: string = '';
 selectedClient: Cliente | null = null;
 selectedProduct: Product | null = null;
 items: VentaItem[] = [];
 metodoPago: 'efectivo' | 'cuenta corriente' = 'efectivo';
 observaciones: string = '';
 puntoVenta: string = '00001';

 //Totales Inicializados en 0 , de momento en pesos
 subtotal: number = 0;
 iva: number = 0;
 total: number = 0;

//Términos de búsqueda vacios
searchTerm: string = '';
 searchProductTerm: string = '';

 // Subjects para búsqueda con debounce
 private searchClienteSubject = new Subject<string>();
 private searchProductSubject = new Subject<string>();

 constructor(
   private ventaService: VentasService,
   private clienteService: ClienteService,
   private productService: ProductService,
   private toastService: ToastService
 ) {
   
   this.setupSearchProduct();
   this.setupSearchCliente();
 }

 ngOnInit(): void {}

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
     this.browserCliModal.show();
   }
  });
}

searchCliente(){
 if (this.searchTerm && this.searchTerm.length > 2) {
   this.searchClienteSubject.next(this.searchTerm);
 }
}
  // Método para abrir el modal
  openClientSearch() {
    this.browserCliModal.show();
  }

  // Método que se ejecuta cuando se selecciona un cliente
  onClientSelected(client: Cliente) {
    // Aquí manejas el cliente seleccionado
    console.log('Cliente seleccionado:', client);
    // Implementa la lógica necesaria con el cliente seleccionado
  }
  searchClients() {
    const filters = {
      ...(this.clientFilter.cod_cliente && { cod_cliente: this.clientFilter.cod_cliente }),
      ...(this.clientFilter.nombre && { nombre: this.clientFilter.nombre }),
      ...(this.searchTerm && { search: this.searchTerm })
    }
  }

//Productos Métodos de búsqueda
 private setupSearchProduct() {
   this.searchProductSubject.pipe(
     debounceTime(300),
     distinctUntilChanged(),
     switchMap(term => this.productService.searchProducts({ search: term }))
   ).subscribe((results: Product[]) => {
    //control flujo de logs en consola
     if (this.showConsoleLogs){
       console.log(results);
     }
     this.filteredProducts = results;
     if (results.length === 1){
      this.selectedProduct = results[0];
     } else if (results.length > 1){
      this.filteredProducts = results;
      this.browserProdModal.show()
     } 
   });
 }



  // Método que se ejecuta cuando se selecciona un cliente
  onProductSelected(product: Product) {
    // Aquí manejas el cliente seleccionado
    console.log('Producto seleccionado:', product);
    // Implementa la lógica necesaria con el cliente seleccionado
  }

searchProduct(){
  if (this.searchProductTerm && this.searchProductTerm.length > 2) {
    this.searchProductSubject.next(this.searchProductTerm);
  }
}

searchProducts() {
  const filters = {
    ...(this.productFilter.cod_producto && { cod_producto: this.productFilter.cod_producto }),
    ...(this.productFilter.nombre && { nombre: this.productFilter.nombre }),
    ...(this.searchProductTerm && { search: this.searchProductTerm })
  };

  this.productService.searchProducts(filters).subscribe({
    next: (response: any) => {
      this.filteredProducts = response.productos || [];
      if (this.filteredProducts.length === 0) {
        this.showAlert('error', 'Sin resultados', 'No encontramos productos con los criterios de búsqueda especificados');
      }
    },
    error: (error) => {
      console.error('Error al buscar productos:', error);
      this.filteredProducts = [];
      this.showAlert('error', 'Error', 'Error al buscar productos');
    }
  });
}

private showAlert(type: string, title: string, message: string) {
  this.toastService.showToast(
    type as 'success' | 'error' | 'warning' | 'info',
    title,
    message
  );
}


openProductSearch() {
  this.clearProductFilters();
  this.browserProdModal.show();
}

clearProductFilters() {
  this.productFilter = {
    cod_producto: '',
    nombre: ''
  };
}

selectProductFromModal(product: Product){
  this.selectedProduct = product;
  this.addItem(product);
  this.displayProductModal	= false;
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

   console.log("abriendo Create Client");
 }




}