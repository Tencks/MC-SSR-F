import { Component, ViewChild } from '@angular/core';
import { ColumnConfig, FilterConfig } from '../../../../core/interfaces/BrowserGenericFiltrers.interface';
import { BrowserGenericComponent } from '../../../../shared/modals/browser-generic/browser-generic.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toasts/toast.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ProductosSubGruposService } from '../../../../core/services/product/subgrupos/productos-sub-grupos.service';
import { ActionBarComponent } from '../../../../shared/utils/action-bar/action-bar.component';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-productos-sub-grupos',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    CommonModule,
    DatePipe,
    BrowserGenericComponent,
    ActionBarComponent
  ],
  templateUrl: './productos-sub-grupos.component.html',
  styleUrl: './productos-sub-grupos.component.css'
})
export class ProductosSubGruposComponent {
  @ViewChild('subgrupoProductosModal') subgrupoProductosModal!: BrowserGenericComponent;
  subGrupoFilters : FilterConfig[] = [
    { key: 'codSubGrupo', label: 'Codigo', type: 'text'},
    { key: 'nombre', label: 'Nombre', type: 'text'},
    { key: 'active', label: 'Activo', type: 'text'},
  ]
  subGrupoColumns: ColumnConfig[]= [
    { key: 'codSubGrupo', label: 'Codigo' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'active', label: 'Activo' },
  ]
  @ViewChild('grupoProductosModal') grupoProductosModal!: BrowserGenericComponent;
  grupoFilters : FilterConfig[] = [
    { key: 'codGrupo', label: 'Codigo', type: 'text'},
    { key: 'nombre', label: 'Nombre', type: 'text'},
  ]
  grupoColumns: ColumnConfig[]= [
    { key: 'codGrupo', label: 'Codigo' },
    { key: 'nombre', label: 'Nombre' },
  ] 
  openSubGrupoProductosModal(){
    this.subgrupoProductosModal.show();
  }
  onItemSelected(item: any){
    // Guardar el ID del producto
  this.productosSubGruposID = item._id || item.id;

  this.productosSubGruposForm.patchValue({
    codSubGrupo: item.codSubGrupo,
    nombre: item.nombre,
    prefijo: item.prefijo,
    bonif: item.bonif,
    nombreGrupo: item.grupo?.nombre,
    grupo: item.grupo?._id || item.grupo?.id,
    comision: item.comision,
    editable: item.editable,
    active: item.active,
    createdAt: item.createdAt,
    createdBy: item.createdBy?.name,
    updatedAt: item.updatedAt,
    updatedBy: item.updatedBy?.name
  });
  }
  openGrupoProductosModal(){
    this.grupoProductosModal.show();
  }
  onItemSelectedGrupo(item: any){
    this.productosSubGruposForm.patchValue({
      grupo: item._id,
      nombreGrupo: item?.nombre,
    });
  }

  
//config de el component
productosSubGruposForm: FormGroup | any ;
isLoading = false;


subgrupos: any[] = [];

  // Añadir una propiedad para mantener el ID del producto
  private productosSubGruposID: string | null = null;
  private productosGruposID: string | null = null;
  // Primero agregamos la propiedad para guardar el ID del grupo actual
  private grupoIdActual: string | null = null;

  constructor(
    private toastService: ToastService,
    public productosSubGruposService: ProductosSubGruposService, // Asegúrate de importar el servicio correcto
    private fb: FormBuilder,
    private location: Location
  ){ 
    this.initForms();
  }

  ngOnInit(): void {}
  initForms(){
    this.productosSubGruposForm = this.fb.group({
      codSubGrupo: [''],
      nombre: [''],
      prefijo: [''],
      grupo: [''],
      nombreGrupo: [''],
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
     const codSubGrupo = this.productosSubGruposForm.get('codSubGrupo')?.value;
     console.log('ENTENDEMOS EVENTO PULSADO DE ENTER');

     if(codSubGrupo){
      this.isLoading = true;
      try {
        //llamamos el service
        const subgrupo = await this.buscarSubGrupo(codSubGrupo);
         if(subgrupo){
          this.cargarDatosSubGrupo(subgrupo);
          this.showAlert('success', 'SubGrupo encontrado', 'SubGrupo encontrado con éxito');
         }else{
          this.showAlert('warning', 'SubGrupo no encontrado', 'No se encontró el subgrupo');
          console.log('SubGrupo no encontrado');
         }
      } catch (error) {
        console.error('Error al buscar el SubGrupo:', error);
        this.showAlert('error', 'Error al buscar el SubGrupo', 'Ocurrió un error al buscar el SubGrupo');
      }finally{
        this.isLoading = false;
      }
     }
    }
  }

  private async buscarSubGrupo(codSubGrupo: string):Promise<any>{
      //EN EL SERVICE DEBE RETORNAR UN PROMISE DE FIRSTVALUEFROM  
    return this.productosSubGruposService.getSubGrupoByCod(codSubGrupo)
  }

  private cargarDatosSubGrupo(response: any){
    if(!response) return;

    const subgrupo = response.subgrupo || response;
    console.log('CargaDatosSubGrupo KeyUp',subgrupo);

      // Guardar el ID del producto
  this.productosSubGruposID = subgrupo._id || subgrupo.id;
    // Guardamos el ID del grupo actual si existe por si se cambia a otro
    this.grupoIdActual = subgrupo.grupo?._id || null;


  this.productosSubGruposForm.patchValue({
    codGrupo: subgrupo.codGrupo,
    nombre: subgrupo.nombre,
    prefijo: subgrupo.prefijo,
    nombreGrupo: subgrupo.grupo?.nombre, //////
    grupo: subgrupo.grupo,
    bonif: subgrupo.bonif,
    comision: subgrupo.comision,
    editable: subgrupo.editable,
    active: subgrupo.active,
    createdAt: subgrupo.createdAt,
    createdBy: subgrupo.createdBy?.name,
    updatedAt: subgrupo.updatedAt,
    updatedBy: subgrupo.updatedBy?.name
  });
  }

  async onSubmit(){
    if(this.productosSubGruposForm.valid){
      this.isLoading = true;
      try {
        // Crear una copia de los datos del formulario
        const subgrupoData = {...this.productosSubGruposForm.value};
        
        // Eliminar los campos que no deben enviarse en la actualización
        delete subgrupoData.createdBy;
        delete subgrupoData.updatedBy;
        delete subgrupoData.createdAt;
        delete subgrupoData.updatedAt;
        delete subgrupoData.nombreGrupo; 
        
        let resultado;
        const nuevoGrupoId = subgrupoData.grupo;
        console.log('subgrupoData', subgrupoData);
        
        console.log('nuevoGrupoId', nuevoGrupoId);
        

        if(this.productosSubGruposID){
         console.log(this.productosSubGruposID, subgrupoData);
         //actualizacion del subgrupo
         resultado = await lastValueFrom(
          this.productosSubGruposService.updateSubGrupo(this.productosSubGruposID, subgrupoData)
         );
         //Manejamos la sociacion del grupo correcto
         if(this.grupoIdActual !== nuevoGrupoId){
          //si teniamos un grupoID anterior y lo cambiamos, lo vamos a desasociar
            if(this.grupoIdActual){
              await lastValueFrom(
                this.productosSubGruposService.disassociateSubgrupoFromGrupo(this.productosSubGruposID, this.grupoIdActual)
              );
            }
         }
         //si tenemos un grupo nuevo, lo asociamos
         if(nuevoGrupoId){
          await lastValueFrom(
            this.productosSubGruposService.associateSubgrupoWithGrupo(this.productosSubGruposID, nuevoGrupoId)
          );
        }else if(this.grupoIdActual) {
          await lastValueFrom(
            this.productosSubGruposService.associateSubgrupoWithGrupo(this.productosSubGruposID, this.grupoIdActual)
          )
        }
        console.log('Subgrupo Actualizado', resultado);
         if(resultado){
          this.showAlert('success', 'Subgrupo Actualizado', 'Subgrupo Actualizado con éxito');
          this.cargarDatosSubGrupo(resultado)
         }else {
          throw new Error('No se pudo actualizar el Subgrupo');
         }        
        }else {
          //creacion de grupo
          resultado = await lastValueFrom(
            this.productosSubGruposService.createSubGrupo(subgrupoData)
          );
          // Si hay un grupo, asociar el nuevo subgrupo
          if (nuevoGrupoId && resultado._id) {
            await lastValueFrom(
              this.productosSubGruposService.associateSubgrupoWithGrupo(
                resultado._id,
                nuevoGrupoId
              )
            );
          }
          console.log('Subgrupo creado', resultado);
          if(resultado){
            this.showAlert('success', 'Subgrupo creado', 'Subgrupo creado con éxito');
            this.cargarDatosSubGrupo(resultado) 
          }else {
            throw new Error('No se pudo crear el Subgrupo');
          }   
        }
      } catch (error) {
        console.error('Error al guardar el Subgrupo:', error);
        this.showAlert('error', 'Error al guardar el Subgrupo', 'Ocurrió un error al guardar el Subgrupo');
      }finally{
        this.isLoading = false;
      }
    }else {
      //MARCARIAMOS LOS CAMPOS COMO INVALIDOS
      this.showAlert('warning', 'Formulario inválido', 'Por favor, complete todos los campos requeridos');
    }
  }

  resetForm(){
    this.productosSubGruposForm.reset();
    this.productosSubGruposID = null;
  }


  agregarSubgrupo(){}

  eliminarSubgrupo(subgrupoId : any){}

  handleAction(action : string){
    switch(action) {
      case 'search':
        // Implement search logic
        this.openSubGrupoProductosModal();
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

