import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionBarComponent } from '../../../../shared/utils/action-bar/action-bar.component';
import { BrowserGenericComponent } from '../../../../shared/modals/browser-generic/browser-generic.component';
import { ToastrModule } from 'ngx-toastr';
import { ColumnConfig, FilterConfig } from '../../../../core/interfaces/BrowserGenericFiltrers.interface';
import { ToastService } from '../../../../core/services/toasts/toast.service';
import { ProductosGruposService } from '../../../../core/services/product/grupos/productos-grupos.service';

@Component({
  selector: 'app-productos-grupos',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastrModule,
    ActionBarComponent,
    BrowserGenericComponent
  ],
  templateUrl: './productos-grupos.component.html',
  styleUrl: './productos-grupos.component.css'
})
export class ProductosGruposComponent implements OnInit{
  @ViewChild('grupoProductosModal') grupoProductosModal!: BrowserGenericComponent;
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
  openGrupoProductosModal(){
    this.grupoProductosModal.show();
  }
  onItemSelected(item: any){}

  
//config de el component
productosGruposForm: FormGroup | any ;
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
subgrupos: any[] = [];

  // Añadir una propiedad para mantener el ID del producto
  private productosGruposID: string | null = null;

  constructor(
    private toastService: ToastService,
    public productosGruposService: ProductosGruposService, // Asegúrate de importar el servicio correcto
  ){ }

  ngOnInit(): void {
    
  }
  onCodigoKeyUp(event: KeyboardEvent){}

  agregarSubgrupo(){}

  editarSubgrupo(subgrupo: any){}
  
  eliminarSubgrupo(subgrupoId : any){}

  handleAction(action : string){}

  private showAlert(type: string, title: string, message: string) {
    this.toastService.showToast(
      type as 'success' | 'error' | 'warning' | 'info',
      title,
      message
    );
  }
  
}
