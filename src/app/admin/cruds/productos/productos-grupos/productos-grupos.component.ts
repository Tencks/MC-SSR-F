import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionBarComponent } from '../../../../shared/utils/action-bar/action-bar.component';
import { BrowserGenericComponent } from '../../../../shared/modals/browser-generic/browser-generic.component';
import { ToastrModule } from 'ngx-toastr';
import { ColumnConfig, FilterConfig } from '../../../../core/interfaces/BrowserGenericFiltrers.interface';
import { ToastService } from '../../../../core/services/toasts/toast.service';
import { ProductosGruposService } from '../../../../core/services/product/grupos/productos-grupos.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-productos-grupos',
  standalone: true,
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
    { key: 'codGrupo', label: 'Codigo', type: 'text'},
    { key: 'nombre', label: 'Nombre', type: 'text'},
  ]
  grupoColumns: ColumnConfig[]= [
    { key: 'codGrupo', label: 'Codigo' },
    { key: 'nombre', label: 'Nombre' },

  ]

  openGrupoProductosModal(){
    this.grupoProductosModal.show();
  }
  onItemSelected(item: any){
    // Guardar el ID del producto
  this.productosGruposID = item._id || item.id;

  this.productosGruposForm.patchValue({
    codGrupo: item.codGrupo,
    nombre: item.nombre,
    prefijo: item.prefijo,
    bonif: item.bonif,
    comision: item.comision,
    editable: item.editable,
    active: item.active,
    createdAt: item.createdAt,
    createdBy: item.createdBy,
    updatedAt: item.updatedAt,
    updatedBy: item.updatedBy
  });
  }

  
//config de el component
productosGruposForm: FormGroup | any ;
isLoading = false;


subgrupos: any[] = [];

  // Añadir una propiedad para mantener el ID del producto
  private productosGruposID: string | null = null;

  constructor(
    private toastService: ToastService,
    public productosGruposService: ProductosGruposService, // Asegúrate de importar el servicio correcto
    private fb: FormBuilder,
    private location: Location
  ){ 
    this.initForms();
  }

  ngOnInit(): void {}
  initForms(){
    this.productosGruposForm = this.fb.group({
      codGrupo: [''],
      nombre: [''],
      prefijo: [''],
      bonif: [''],
      comision: [''],
      editable: [''],
      active: [''],
      createdAt: [''],
      createdBy: [''],
      updatedAt: [''],
      updatedBy: [''],
    })
  }

  async onCodigoKeyUp(event: KeyboardEvent){
    if (event.key === 'Enter') {
     const codGrupo = this.productosGruposForm.get('codGrupo')?.value;
     console.log('ENTENDEMOS EVENTO PULSADO DE ENTER');

     if(codGrupo){
      this.isLoading = true;
      try {
        //llamamos el service
        const grupo = await this.buscarGrupo(codGrupo);
         if(grupo){
          this.cargarDatosGrupo(grupo);
          this.showAlert('success', 'Grupo encontrado', 'Grupo encontrado con éxito');
         }else{
          this.showAlert('warning', 'Grupo no encontrado', 'No se encontró el grupo');
          console.log('Grupo no encontrado');
         }
      } catch (error) {
        console.error('Error al buscar el grupo:', error);
        this.showAlert('error', 'Error al buscar el grupo', 'Ocurrió un error al buscar el grupo');
      }finally{
        this.isLoading = false;
      }
     }
    }
  }

  private async buscarGrupo(codGrupo: string):Promise<any>{
    return this.productosGruposService.getGrupoByCod(codGrupo)
  }

  private cargarDatosGrupo(response: any){
    if(!response) return;

    const grupo = response.grupo || response;
      // Guardar el ID del producto
  this.productosGruposID = grupo._id || grupo.id;

  this.productosGruposForm.patchValue({
    codGrupo: grupo.codGrupo,
    nombre: grupo.nombre,
    prefijo: grupo.prefijo,
    bonif: grupo.bonif,
    comision: grupo.comision,
    editable: grupo.editable,
    active: grupo.active,
    createdAt: grupo.createdAt,
    createdBy: grupo.createdBy,
    updatedAt: grupo.updatedAt,
    updatedBy: grupo.updatedBy
  });
  }

  async onSubmit(){
    if(this.productosGruposForm.valid){
      this.isLoading = true;
      try {
        const grupoData = this.productosGruposForm.value;
        
        let resultado;

        if(this.productosGruposID){
         console.log(this.productosGruposID, grupoData);
         //actualizacion
         resultado = await lastValueFrom(
          this.productosGruposService.updateGrupo(this.productosGruposID, grupoData)
         );
         console.log('Grupo Actualizado', resultado);
         if(resultado){
          this.showAlert('success', 'Grupo Actualizado', 'Grupo Actualizado con éxito');
          this.cargarDatosGrupo(resultado)
         }else {
          throw new Error('No se pudo actualizar el grupo');
         }        
        }else {
          //creacion de grupo
          resultado = await lastValueFrom(
            this.productosGruposService.createGrupo(grupoData)
          )
          console.log('Grupo creado', resultado);
          if(resultado){
            this.showAlert('success', 'Grupo creado', 'Grupo creado con éxito');
            this.cargarDatosGrupo(resultado) 
          }else {
            throw new Error('No se pudo crear el grupo');
          }   
        }
      } catch (error) {
        console.error('Error al guardar el grupo:', error);
        this.showAlert('error', 'Error al guardar el grupo', 'Ocurrió un error al guardar el grupo');
      }finally{
        this.isLoading = false;
      }
    }else {
      //MARCARIAMOS LOS CAMPOS COMO INVALIDOS
      this.showAlert('warning', 'Formulario inválido', 'Por favor, complete todos los campos requeridos');
    }
  }

  resetForm(){
    this.productosGruposForm.reset();
    this.productosGruposID = null;
  }


  agregarSubgrupo(){}

  editarSubgrupo(subgrupo: any){}
  
  eliminarSubgrupo(subgrupoId : any){}

  handleAction(action : string){
    switch(action) {
      case 'search':
        // Implement search logic
        this.openGrupoProductosModal();
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
        this.location.back();
        break;
      case 'info':
        // Implement info display logic
        this.showAlert('info', 'Información', 'Esta es una alerta de información');
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
