import { CommonModule,  Location } from '@angular/common';
import {  Component,  OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionBarComponent } from '../../../../shared/utils/action-bar/action-bar.component';
import { BrowserGenericComponent } from '../../../../shared/modals/browser-generic/browser-generic.component';
import { ToastrModule } from 'ngx-toastr';
import { ColumnConfig, FilterConfig } from '../../../../core/interfaces/BrowserGenericFiltrers.interface';
import { ToastService } from '../../../../core/services/toasts/toast.service';
import { ProductosGruposService } from '../../../../core/services/product/grupos/productos-grupos.service';
import {  lastValueFrom } from 'rxjs';
import { ProductosSubGruposService } from '../../../../core/services/product/subgrupos/productos-sub-grupos.service';
import { DeleteGenericComponent } from '../../../../shared/modals/delete-generic/delete-generic.component';
import { ActionGenericModalComponent } from '../../../../shared/modals/action-generic-modal/action-generic-modal.component';

@Component({
  selector: 'app-productos-grupos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastrModule,
    ActionBarComponent,
    BrowserGenericComponent,
    DeleteGenericComponent,
    ActionGenericModalComponent
    // DatePipe
  ],
  templateUrl: './productos-grupos.component.html',
  styleUrl: './productos-grupos.component.css'
})
export class ProductosGruposComponent implements OnInit{
  @ViewChild('dissociateModal') dissociateModal!: ActionGenericModalComponent;
  @ViewChild('deleteModal') deleteModal!: DeleteGenericComponent;
  @ViewChild('grupoProductosModal') grupoProductosModal!: BrowserGenericComponent;
  @ViewChild('subgrupoProductosModal') subgrupoProductosModal!: BrowserGenericComponent;
  grupoFilters : FilterConfig[] = [
    { key: 'codGrupo', label: 'Codigo', type: 'text'},
    { key: 'nombre', label: 'Nombre', type: 'text'},
  ]
  grupoColumns: ColumnConfig[]= [
    { key: 'codGrupo', label: 'Codigo' },
    { key: 'nombre', label: 'Nombre' },

  ]
  
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

selectedSubgrupo: any = null;

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
    grupo: item.grupo,
    subgrupos: item.subgrupos,
    bonif: item.bonif,
    comision: item.comision,
    editable: item.editable,
    active: item.active,
    createdAt: item.createdAt,
    createdBy: item.createdBy?.name,
    updatedAt: item.updatedAt,
    updatedBy: item.updatedBy?.name
  });

    //cargamos subgrupos asociados 
    try {
      if(item.subgrupos.length > 0){
        this.subgrupos = item.subgrupos;
        console.log('Subgrupos cargados desde el populate:', this.subgrupos);
      }
    } catch (error) {
      console.error('Error al cargar los subgrupos:', error);
    }

  }

  openSubGrupoProductosModal(){
    this.subgrupoProductosModal.show();
  }
  
  async onItemSelectedSubgrupo(item: any){
    // Verificar si se ha seleccionado un grupo
    if (!this.productosGruposID) {
      this.showAlert('warning', 'Error', 'Debe seleccionar un grupo primero');
      return;
    }
  
    try {
      // Verificar si el subgrupo ya está en la lista
      const subgrupoExistente = this.subgrupos.find(s => s._id === item._id);
      if (subgrupoExistente) {
        this.showAlert('warning', 'Subgrupo existente', 'Este subgrupo ya está asociado al grupo');
        return;
      }

      //asociamos al grupo nuevo
      await lastValueFrom(
        this.productosSubGruposService.associateSubgrupoWithGrupo(
          item._id,
          this.productosGruposID
        )
      );
      // Recargar los datos del subgrupo actualizado
      const subgrupoActualizado = await lastValueFrom(
        this.productosSubGruposService.getSubGrupo(item._id)
      );
      // Inicializar el array si es null o undefined
      if (!this.subgrupos) {
        this.subgrupos = [];
      }
     
      // Agregar el subgrupo actualizado al array
      this.subgrupos.push(subgrupoActualizado);
      this.showAlert('success', 'Subgrupo asociado', 'Subgrupo asociado con éxito');

    //   // Primero crear/actualizar el subgrupo
    // const resultado = await lastValueFrom(
    //   this.productosSubGruposService.createSubGrupo(item)
    // );

    // if (resultado) {
    //   // Luego asociar con el grupo
    //   await lastValueFrom(
    //     this.productosSubGruposService.associateSubgrupoWithGrupo(
    //       resultado._id,
    //       this.productosGruposID
    //     )
    //   );

    //   this.showAlert('success', 'Subgrupo asociado', 'Subgrupo asociado con éxito');
    //   this.subgrupos.push(resultado);
    // }
  } catch (error) {
    console.error('Error:', error);
    this.showAlert('error', 'Error', 'No se pudo asociar el subgrupo');
  }


  }

  
//config de el component
productosGruposForm: FormGroup | any ;
isLoading = false;


subgrupos: any[] = []

  // Añadir una propiedad para mantener el ID del producto
  private productosGruposID: string | null = null;

  constructor(
    private toastService: ToastService,
    public productosGruposService: ProductosGruposService, // Asegúrate de importar el servicio correcto
    public productosSubGruposService: ProductosSubGruposService, // Asegúrate de importar el servicio correcto
    private fb: FormBuilder,
    private location: Location,
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
      //EN EL SERVICE DEBE RETORNAR UN PROMISE DE FIRSTVALUEFROM  
    return this.productosGruposService.getGrupoByCod(codGrupo)
  }

  private async cargarDatosGrupo(response: any){
    if(!response) return;

    const grupo = response.grupo || response;
    // const datePipe = new DatePipe('es-AR');
      // Guardar el ID del producto
  this.productosGruposID = grupo._id || grupo.id;

  console.log(grupo);
  
 
  this.productosGruposForm.patchValue({
    codGrupo: grupo.codGrupo,
    nombre: grupo.nombre,
    prefijo: grupo.prefijo,
    bonif: grupo.bonif,
    comision: grupo.comision,
    editable: grupo.editable,
    active: grupo.active,
    createdAt: grupo.createdAt,
    createdBy: grupo.createdBy?.name,
    updatedAt: grupo.updatedAt,
    updatedBy: grupo.updatedBy?.name
  });

  //cargamos subgrupos asociados 
  try {
    if(grupo.subgrupos.length > 0){
      this.subgrupos = grupo.subgrupos;
      console.log('Subgrupos cargados desde el populate:', this.subgrupos);
    }
  } catch (error) {
    console.error('Error al cargar los subgrupos:', error);
  }

  // try {
  //   const subgruposAsociados = await lastValueFrom(
  //     this.productosSubGruposService.getSubGruposByGrupo(grupo._id) 
  //   );
  //   if(subgruposAsociados){
  //     this.subgrupos = subgruposAsociados ;
  //     console.log('Subgrupos cargados:', this.subgrupos);
  //   }
  // } catch (error) {
  //   console.error('Error al cargar los subgrupos:', error);
  //   this.showAlert('error', 'Error al cargar los subgrupos', 'Ocurrió un error al cargar los subgrupos');
  // }

  }

  async onSubmit(){
    if(this.productosGruposForm.valid){
      this.isLoading = true;
      try {
        // Crear una copia de los datos del formulario
        const grupoData = {...this.productosGruposForm.value};
        
        // Eliminar los campos que no deben enviarse en la actualización
        delete grupoData.createdBy;
        delete grupoData.updatedBy;
        delete grupoData.createdAt;
        delete grupoData.updatedAt;
        
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
    this.subgrupos = [];
  }

  deleteGrupo(){
    if(this.productosGruposID){
     //logica
     console.log('eliminando grupo....');
      
    }
  }

  showDeleteModal(){
    this.deleteModal.show();
  }

  agregarSubgrupo(){}

  showDissociateModal(subgrupo: any) {
    this.selectedSubgrupo = subgrupo;
    this.dissociateModal.show();
  }

  async confirmDissociateSubgrupo() {
    if (!this.selectedSubgrupo) return;
    
    try {
      if(this.productosGruposID){
        await lastValueFrom(
          this.productosGruposService.dissociateSubgrupoFromGrupo(
            this.selectedSubgrupo._id,
            this.productosGruposID
          )
        );
        
        // Actualizar la lista de subgrupos
        this.subgrupos = this.subgrupos.filter(s => s._id !== this.selectedSubgrupo._id);
        this.showAlert('success', 'Subgrupo desasociado', 'El subgrupo ha sido desasociado exitosamente');
      }
    } catch (error) {
      console.error('Error al desasociar:', error);
      this.showAlert('error', 'Error', 'No se pudo desasociar el subgrupo');
    }
  }


  editarSubgrupo(subgrupo: any){}
  
  // eliminarSubgrupo(subgrupoId : any){
  //   console.log('Subgrupo a eliminar:', subgrupoId);
    
  //   //debemos tirar un modal de confirmacion
  //   if(subgrupoId){
  //    //disasociamos el subgrupo del grupo
  //    if(this.productosGruposID){
  //      this.productosSubGruposService.disassociateSubgrupoFromGrupo(subgrupoId, this.productosGruposID).subscribe({
  //       next: (response) =>{
  //         console.log(response);
          
  //       }
  //      }) 
  //   }    
  // }
  // }

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
        this.showDeleteModal();
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
