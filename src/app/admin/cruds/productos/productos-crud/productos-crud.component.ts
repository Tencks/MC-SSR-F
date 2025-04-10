import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product/product.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActionBarComponent } from '../../../../shared/utils/action-bar/action-bar.component';
import { Location } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from '../../../../core/services/toasts/toast.service';
import { lastValueFrom } from 'rxjs';
import { BrowserGenericComponent } from '../../../../shared/modals/browser-generic/browser-generic.component';import { ColumnConfig, FilterConfig } from '../../../../core/interfaces/BrowserGenericFiltrers.interface';



@Component({
  selector: 'app-productos-crud',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    ActionBarComponent,
    CommonModule,
    ToastrModule,
    BrowserGenericComponent 
    // RouterLink
  ],
  templateUrl: './productos-crud.component.html',
  styleUrl: './productos-crud.component.css'
})
export class ProductosCrudComponent implements OnInit{
//config del modal BrowserGeneric
@ViewChild('grupoModal') grupoModal!: BrowserGenericComponent;
grupoFilters : FilterConfig[] = [
  { key: 'codProducto', label: 'Codigo', type: 'text'},
  { key: 'nombre', label: 'Nombre', type: 'text'},
  { key: 'grupo', label: 'Grupo', type: 'text'},
]
grupoColumns: ColumnConfig[]= [
  { key: 'codProducto', label: 'Codigo' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'grupo', label: 'Grupo' }, 
]
openGrupoModal(){
  this.grupoModal.show();
}
onItemSelected(item: any) {
  // Guardar el ID del producto
  this.productoId = item._id || item.id;

  this.productoForm.patchValue({
    codProducto: item.codProducto,
    codBarra: item.codBarra || item.codProducto,
    nombre: item.nombre,
    grupo: item.grupo,
    subgrupo: item.subgrupo,
    marca: item.marca,
    modelo: item.modelo,
    vtaCpa: item.vtaCpa,
    tipoCompra: item.tipoCompra,
    alicuotaIVA: item.alicuotaIVA,
    peso: item.peso,
    unidadPeso: item.unidadPeso,
    unidadInventario: item.unidadInventario,
    unidadBulto: item.unidadBulto,
    unidadCompra: item.unidadCompra,
    conversion: item.conversion,
    unidadInterna: item.unidadInterna,
    listaPrecio: item.listaPrecio || 'GENERAL',
    moneda: item.moneda || 'PESOS',
    precio: item.precio,
    precioConIVA: item.precioConIVA,
    incluyeIVA: item.incluyeIva
  });

  this.stockForm.patchValue({
    stockMinimo: item.stockMinimo,
    stockMaximo: item.stockMaximo,
    stockReservado: item.stockReservado,
    stockCompra: item.stockCompra,
    stockActual: item.stockActual,
    leadTime: item.leadTime,
    loteOptimo: item.loteOptimo,
    ubicacionDep: item.ubicacionDep,
    operaConStock: item.operaConStock,
    noValorizaStock: item.noValorizaStock,
    proveedor: item.proveedor,
    ordenCompra: item.ordenCompra,
    proximaEntrega: item.proximaEntrega,
    centroVta: item.centroVta,
    centroCosto: item.centroCosto,
    codigoMateriaPrima: item.codigoMateriaPrima,
    cantidadMateriaPrima: item.cantidadMateriaPrima
  });

  this.especificacionesForm.patchValue({
    atributo1: item.atributo1,
    atributo2: item.atributo2,
    atributo3: item.atributo3,
    fechaAlta: item.createdAt,
    usuarioAlta: item.createdBy,
    fechaModif: item.updatedAt,
    usuarioModif: item.updatedBy
  });

  this.proveedores = item.proveedores || [];
  this.atributosDinamicos = item.atributosDinamicos || [];
}

//config de el component
  productoForm: FormGroup | any ;
  stockForm: FormGroup |any ;
  especificacionesForm: FormGroup |any ;
  isLoading = false;

  atributosDinamicos: any[] = [];
  proveedores: any[] = [];

  tiposCompra: string[] = ['Compra Externa', 'Compra Interna'];
  alicuotasIVA: string[] = ['0%', '10.5%', '21%'];
  unidadesMedida: string[] = ['LT', 'KG', 'K', 'MT', 'BOLSAS', 'FRASCO', 'ML', 'TN', 'UNIDAD', 'OTRO'];
  viasCompra: string[] = ['De Ventas y Compras', 'Compra Externa'];
  tiposFacturacion: string[] = ['Unidad', 'Kilos'];

    // Añadir una propiedad para mantener el ID del producto
    private productoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private locacion: Location,
    public productService: ProductService,
    private toastService: ToastService
  ) {
    this.initForms();
  }
  ngOnInit(): void {

  }

  initForms(){
  // Formulario de Datos Generales
    this.productoForm = this.fb.group({
      codProducto: ['', Validators.required],
      codBarra: [''],
      nombre: ['', Validators.required],
      grupo: [''],
      subgrupo: [''],
      marca: [''],
      modelo: [''],
      vtaCpa: [''],
      tipoCompra: ['Compra Externa'],
      alicuotaIVA: [''],
      peso: [0],
      unidadPeso: [''],
      unidadInventario: [''],
      unidadBulto: [1],
      unidadCompra: [''],
      conversion: [1],
      unidadInterna:[''],
      listaPrecio:['GENERAL'],
      moneda:['PESOS'],
      porcentajeGanancia: [0],
      precio: [0],
      precioConIVA: [0],
      incluyeIVA: [false],
    });
    
  // Formulario de Stock
    this.stockForm = this.fb.group({
      stockMinimo: [0],
      stockMaximo: [0],
      stockReservado: [0],
      stockCompra: [0],
      stockActual: [0],
      leadTime: [''],
      loteOptimo: [''],
      ubicacionDep: [''],
      operaConStock: [true],
      noValorizaStock: [false],
      proveedor: [''],
      ordenCompra: [''],
      proximaEntrega: [''],
      centroVta: [''],
      centroCosto: [''],
      codigoMateriaPrima: [''],
      cantidadMateriaPrima: [0]
    });

  // Formulario de Especificaciones
    this.especificacionesForm = this.fb.group({
      atributo1: [''],
      atributo2: [''],
      atributo3: [''],
      fechaAlta: [{value: '', disabled: true}],
      usuarioAlta: [{value: '', disabled: true}],
      fechaModif: [{value: '', disabled: true}],
      usuarioModif: [{value: '', disabled: true}]
    });
  }

//Funcion Async para buscar productos por codigo
async onCodigoKeyUp(event: KeyboardEvent){
  if (event.key === 'Enter'){
    const codProducto = this.productoForm.get('codProducto')?.value;
    console.log('ENTENDEMOS EVENTO PULSADO DE ENTER');
    
    if(codProducto){
      this.isLoading = true;
      try{
        //llamamos al service
        const producto = await this.buscarProducto(codProducto);
          if (producto) {
            this.cargarDatosProducto(producto);
            //implementamos alerta de ngx-toastr
            this.showAlert('info', 'Información', 'Codigo recuperado');
          } else {
            // Mostrar mensaje de producto no encontrado
            console.log('Producto no encontrado');
          }
        } catch (error) {
          console.error('Error al buscar producto:', error);
          //implementamos alerta de ngx-toastr
          this.showAlert('warning', 'Adventencia', 'Codigo inexistente');
        } finally {
          this.isLoading = false;
        }
      }
    }
  }

private async buscarProducto(codProducto: string): Promise<any>{
  //Implememtación del service de producto Ejemplo
  return this.productService.getProductByCod(codProducto);
  // return null
}

private cargarDatosProducto(producto: any){

  // Guardar el ID del producto
  this.productoId = producto._id || producto.id; // dependiendo de cómo venga del backend

  this.productoForm.patchValue({
    codProducto: producto.codProducto,
    codBarra: producto.codBarra || producto.codProducto,
    nombre: producto.nombre,
    grupo: producto.grupo,
    subgrupo: producto.subgrupo,
    marca: producto.marca,
    modelo: producto.modelo,
    vtaCpa: producto.vtaCpa,
    tipoCompra: producto.tipoCompra,
    alicuotaIVA: producto.alicuotaIVA,
    peso: producto.peso,
    unidadPeso: producto.unidadPeso,
    unidadInventario: producto.unidadInventario,
    unidadBulto: producto.unidadBulto,
    unidadCompra: producto.unidadCompra,
    conversion: producto.conversion,
    unidadInterna: producto.unidadInterna,
    listaPrecio: producto.listaPrecio || 'GENERAL',
    moneda: producto.moneda || 'PESOS',
    precio: producto.precio,
    precioConIVA: producto.precioConIVA,
    incluyeIVA: producto.incluyeIva
  });

  this.stockForm.patchValue({
    stockMinimo: producto.stockMinimo,
    stockMaximo: producto.stockMaximo,
    stockReservado: producto.stockReservado,
    stockCompra: producto.stockCompra,
    stockActual: producto.stockActual,
    leadTime: producto.leadTime,
    loteOptimo: producto.loteOptimo,
    ubicacionDep: producto.ubicacionDep,
    operaConStock: producto.operaConStock,
    noValorizaStock: producto.noValorizaStock,
    proveedor: producto.proveedor,
    ordenCompra: producto.ordenCompra,
    proximaEntrega: producto.proximaEntrega,
    centroVta: producto.centroVta,
    centroCosto: producto.centroCosto,
    codigoMateriaPrima: producto.codigoMateriaPrima,
    cantidadMateriaPrima: producto.cantidadMateriaPrima
  });

  this.especificacionesForm.patchValue({
    atributo1: producto.atributo1,
    atributo2: producto.atributo2,
    atributo3: producto.atributo3,
    fechaAlta: producto.createdAt,
    usuarioAlta: producto.createdBy,
    fechaModif: producto.updatedAt,
    usuarioModif: producto.updatedBy
  });

  this.proveedores = producto.proveedores || [];
  this.atributosDinamicos = producto.atributosDinamicos || [];
}

  // Modificar onSubmit para manejar tanto creación como actualización
async onSubmit() {
  if (this.productoForm.valid && this.stockForm.valid && this.especificacionesForm.valid) {
    this.isLoading = true;
    try {
      const productoData = {
        ...this.productoForm.value,
        ...this.stockForm.value,
        ...this.especificacionesForm.value,
        proveedores: this.proveedores,
        atributosDinamicos: this.atributosDinamicos
      };
      
      let resultado;

      if(this.productoId){
        console.log(this.productoId, productoData)
        //actualizar producto
        resultado = await lastValueFrom(
          this.productService.updateProduct(this.productoId, productoData)
        );
        console.log('Producto actualizado:', resultado);
        if (resultado ) {
          this.cargarDatosProducto(resultado);
          this.showAlert('success', 'Actualizado', 'Actualizamos correctamente el producto');
        } else {
          throw new Error('No se recibió la respuesta esperada del servidor');
        }
      }else {
        //creadndo producto
        resultado = await lastValueFrom( this.productService.createProduct(productoData));
        console.log('Producto creado:', resultado);
        if (resultado) {
          this.cargarDatosProducto(resultado);
          //implementamos alerta de ngx-toastr
          this.showAlert('success', 'Creado', 'Creamos correctamente el producto');
        } else {
          throw new Error('No se recibió la respuesta esperada del servidor');
        }          
      }

    } catch (error) {
      console.error('Error al crear/actualizar producto:', error);
      //implementamos alerta de ngx-toastr
      this.showAlert('error', 'Error', 'Fallo la creación/actulización del producto');
    } finally{
      this.isLoading = false;
    }
  } else {

    // Marcar todos los campos inválidos como touched para mostrar errores
        Object.keys(this.productoForm.controls).forEach(key => {
          const control = this.productoForm.get(key);
          if (control.invalid) {
            control.markAsTouched();
          }
        });
        Object.keys(this.stockForm.controls).forEach(key => {
          const control = this.stockForm.get(key);
          if (control.invalid) {
            control.markAsTouched();
          }
        });
        Object.keys(this.especificacionesForm.controls).forEach(key => {
          const control = this.especificacionesForm.get(key);
          if (control.invalid) {
            control.markAsTouched();
          }
        });                                     
    //implementamos alerta de ngx-toastr
    this.showAlert('warning', 'Adventencia', 'Complete todos los campos requeridos');
  }
}

// Modificar resetForm para limpiar también la selección
resetForm() {
  this.productoId = null; // Resetear el ID
  this.productoForm.reset();
  this.stockForm.reset();
  this.especificacionesForm.reset();
  this.proveedores = [];
  this.atributosDinamicos = [];
}

handleAction(action: string) {
  switch(action) {
    case 'search':
      // Implement search logic
      this.openGrupoModal();
      this.resetForm();
      break;
    case 'create':
      this.resetForm();
      break;
    case 'delete':
      // Implement delete logic
      break;
    case 'save':
      this.onSubmit();
      break;
    case 'cancel':
      this.resetForm();
      break;
    case 'print':
      // Implement print logic
      break;
    case 'close':
      // this.router.navigate(['/profile']);
      this.locacion.back();
      break;
    case 'info':
      // Implement info display logic
      break;
    }
  }


  private showAlert(type: string, title: string, message: string) {
    this.toastService.showToast(
      type as 'success' | 'error' | 'warning' | 'info',
      title,
      message
    );
  }
  
}