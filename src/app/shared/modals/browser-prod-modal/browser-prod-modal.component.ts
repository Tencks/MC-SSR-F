import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Product } from '../../../core/interfaces/product.interface';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ProductService } from '../../../core/services/product/product.service';
import { ToastService } from '../../../core/services/toasts/toast.service';

@Component({
  selector: 'app-browser-prod-modal',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  templateUrl: './browser-prod-modal.component.html',
  styleUrl: './browser-prod-modal.component.css'
})
export class BrowserProdModalComponent {

  @Output() productSelected = new EventEmitter<any>();
  visible: boolean = false;
  showConsoleLogs: boolean = true;

  private searchProductoSubject = new Subject<string>();
  searchTerm: string = '';
  selectedProduct: Product | null = null;

  productFilter = {
    cod_producto: '',
    nombre: ''
  };

  filteredProducts: any[] = [];

  constructor(
    private productoService: ProductService,
    private toastService: ToastService
  ){}

  ngOnInit(): void {
    this.setupSearchProducto();
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

  private setupSearchProducto() {
    this.searchProductoSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.productoService.searchProducts({ search: term }))
    ).subscribe((results: Product[]) => {
      if (this.showConsoleLogs){
        console.log(results);
      }
      if (results.length === 1){
        this.selectedProduct = results[0];
      } else if (results.length > 1){
        this.filteredProducts = results;
        this.show();
      }
    });
  }

  searchProducto(){
    if (this.searchTerm && this.searchTerm.length > 2) {
      this.searchProductoSubject.next(this.searchTerm);
    }
  }

  searchProducts() {
    const filters = {
      ...(this.productFilter.cod_producto && { cod_producto: this.productFilter.cod_producto }),
      ...(this.productFilter.nombre && { nombre: this.productFilter.nombre }),
      ...(this.searchTerm && { search: this.searchTerm })
    };

    this.productoService.searchProducts(filters).subscribe({
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

  clearFilters() {
    this.productFilter = {
      cod_producto: '',
      nombre: ''
    };
    this.searchTerm = '';
    this.filteredProducts = [];
  }

  selectProduct(product: Product) {
    this.productSelected.emit(product);
    this.hide();
  }
}