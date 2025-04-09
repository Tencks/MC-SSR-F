import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionBarComponent } from '../../../../shared/utils/action-bar/action-bar.component';
import { BrowserGenericComponent } from '../../../../shared/modals/browser-generic/browser-generic.component';
import { ClienteService } from '../../../../core/services/cliente/cliente.service';
import { ToastService } from '../../../../core/services/toasts/toast.service';
import { ColumnConfig, FilterConfig } from '../../../../core/interfaces/BrowserGenericFiltrers.interface';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-crud',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActionBarComponent,
    BrowserGenericComponent
  ],
  templateUrl: './clientes-crud.component.html',
  styleUrl: './clientes-crud.component.css'
})
export class ClientesCrudComponent implements OnInit{
  @ViewChild('clienteModal') clienteModal!: BrowserGenericComponent;

  clienteForm: FormGroup | any;
  isLoading: boolean = false;
  private clienteId: string | null = null;

  //Config del buscador
  clienteFilters : FilterConfig[] = [
    { key: 'codCliente', label: 'Código', type: 'text' },
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'grupo', label: 'Grupo', type: 'text' }
  ];

  clienteColumns: ColumnConfig[] = [
    { key: 'codCliente', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'grupo', label: 'Grupo' }
  ];

    // Listas para los selects
    tiposDocumento = ['DNI', 'CUIT', 'CUIL', 'Pasaporte'];
    condicionesIVA = ['Responsable Inscripto', 'Consumidor Final', 'Monotributista', 'Exento'];
    provincias = ['Buenos Aires', 'CABA', 'Córdoba', 'Santa Fe', 'Mendoza'];

    constructor(
      private fb:FormBuilder,
      private router: Router,
      private location: Location,
      public clientService: ClienteService,
      private toastService: ToastService
    ){
      this.initForms();
    }

    ngOnInit(): void {}

    private initForms() {
      this.clienteForm = this.fb.group({
        codCliente: ['', Validators.required],
        fantasia: [''],
        nombre: ['', Validators.required],
        grupo: ['NO ESPECIFICA'],
        subgrupo: [''],
        direccion: this.fb.group({
          calle: [''],
          numero: [''],
          piso: [''],
          departamento: [''],
          localidad: [''],
          provincia: [''],
          pais: ['']
        }),
        telefonos: this.fb.group({
          principal: [''],
          otros: [''],
          celular: ['']
        }),
        sitioWeb: [''],
        email: ['', Validators.email],
        documentacion: this.fb.group({
          tipoDocumento: [''],
          numeroDocumento: [''],
          cuit: [''],
          vto: ['']
        }),
        comercial: this.fb.group({
          categoriaIIBB: [''],
          vendedor: [''],
          descuento1: [0],
          descuento2: [0],
          ctaContable: [''],
          zona: [''],
          recargo: [''],
          transporte: [''],
          lugarEntrega: [''],
          listaPrecio: [''],
          condicionPago: [''],
          limiteCredito: [0]
        }),
        fiscal: this.fb.group({
          condicionIVA: ['Consumidor Final'],
          exentoIVA: [false],
          percepIVA: [''],
          agenteRetencion: [false],
          revendedor: [false]
        }),
        active: [true]
      });
    }

    openClienteModal(){
      this.clienteModal.show();
    }
    onItemSelected(item: any) {
      // Guardar el ID del producto
      this.clienteId = item._id || item.id;
    
      this.clienteForm.patchValue({
        codCliente: item.codCliente,
        nombre: item.nombre,
        grupo: item.grupo,
        subgrupo: item.subgrupo,
        direccion: {
          calle: item.direccion.calle,
          numero: item.direccion.numero,
          piso: item.direccion.piso, 
          departamento: item.direccion.departamento,
          localidad: item.direccion.localidad,
          provincia: item.direccion.provincia,
          pais: item.direccion.pais
        },
        telefonos:{
          principal: item.telefonos.principal,
          otros: item.telefonos.otros,
          celular: item.telefonos.celular
        },
        sitioWeb: item.sitioWeb,
        email: item.email,
        documentacion: {
          tipoDocumento: item.documentacion.tipoDocumento,
          numeroDocumento: item.documentacion.numeroDocumento,
          cuit: item.documentacion.cuit,
          vto: item.documentacion.vto
        },
        comercial:{
          categoriaIIBB: item.comercial.categoriaIIBB,
          vendedor: item.comercial.vendedor,
          descuento1: item.comercial.descuento1,
          descuento2: item.comercial.descuento2,
          ctaContable: item.comercial.ctaContable,
          zona: item.comercial.zona,
          recargo: item.comercial.recargo,
          transporte: item.comercial.transporte,
          lugarEntrega: item.comercial.lugarEntrega,
          listaPrecio: item.comercial.listaPrecio,
          condicionPago: item.comercial.condicionPago,
          limiteCredito: item.comercial.limiteCredito
        },
        fiscal:{
          condicionIVA: item.fiscal.condicionIVA,
          exentoIVA: item.fiscal.exentoIVA,
          percepIVA: item.fiscal.percepIVA, 
          agenteRetencion: item.fiscal.agenteRetencion,
          revendedor: item.fiscal.revendedor
        },
        active: item.active

      });
    

    }
    



    //Funcion Async para buscar productos por codigo
async onCodigoKeyUp(event: KeyboardEvent){
  if (event.key === 'Enter'){
    const codCliente = this.clienteForm.get('codCliente')?.value;
    console.log('ENTENDEMOS EVENTO PULSADO DE ENTER');
    
    if(codCliente){
      this.isLoading = true;
      try{
        //llamamos al service
        const cliente = await this.buscarCliente(codCliente);
          if (cliente) {
            this.cargarDatosCliente(cliente);
            //implementamos alerta de ngx-toastr
            this.showAlert('info', 'Información', 'Codigo recuperado');
          } else {
            // Mostrar mensaje de producto no encontrado
            console.log('Cliente no encontrado');
          }
        } catch (error) {
          console.error('Error al buscar cliente:', error);
          //implementamos alerta de ngx-toastr
          this.showAlert('warning', 'Adventencia', 'Codigo inexistente');
        } finally {
          this.isLoading = false;
        }
      }
    }
  }

  private cargarDatosCliente(cliente: any) {
    if (!cliente) return;
    this.clienteId = cliente.cliente._id;

    this.clienteForm.patchValue({
      codCliente: cliente.cliente.codCliente || '',
      fantasia: cliente.fantasia || '',
      nombre: cliente.cliente.nombre || '',
      grupo: cliente.grupo || 'NO ESPECIFICA',
      subgrupo: cliente.subgrupo || '',
      direccion: {
        calle: cliente.cliente.direccion?.calle || '',
        numero: cliente.cliente.direccion?.numero || '',
        piso: cliente.direccion?.piso || '',
        departamento: cliente.direccion?.departamento || '',
        localidad: cliente.direccion?.localidad || '',
        provincia: cliente.direccion?.provincia || '',
        pais: cliente.direccion?.pais || ''
      },
      telefonos: {
        principal: cliente.telefonos?.principal || '',
        otros: cliente.telefonos?.otros || '',
        celular: cliente.telefonos?.celular || ''
      },
      sitioWeb: cliente.sitioWeb || '',
      email: cliente.email || '',
      documentacion: {
        tipoDocumento: cliente.documentacion?.tipoDocumento || 'DNI',
        numeroDocumento: cliente.documentacion?.numeroDocumento || '',
        cuit: cliente.documentacion?.cuit || '',
        vto: cliente.documentacion?.vto || null
      },
      comercial: {
        categoriaIIBB: cliente.comercial?.categoriaIIBB || '',
        vendedor: cliente.comercial?.vendedor || '',
        descuento1: cliente.comercial?.descuento1 || 0,
        descuento2: cliente.comercial?.descuento2 || 0,
        ctaContable: cliente.comercial?.ctaContable || '',
        zona: cliente.comercial?.zona || '',
        recargo: cliente.comercial?.recargo || '',
        transporte: cliente.comercial?.transporte || '',
        lugarEntrega: cliente.comercial?.lugarEntrega || '',
        listaPrecio: cliente.comercial?.listaPrecio || '',
        condicionPago: cliente.comercial?.condicionPago || '',
        limiteCredito: cliente.comercial?.limiteCredito || 0
      },
      fiscal: {
        condicionIVA: cliente.fiscal?.condicionIVA || 'Consumidor Final',
        exentoIVA: cliente.fiscal?.exentoIVA || false,
        percepIVA: cliente.fiscal?.percepIVA || '',
        agenteRetencion: cliente.fiscal?.agenteRetencion || false,
        revendedor: cliente.fiscal?.revendedor || false
      },
      active: cliente.active ?? true 
    })

  }
  
  private async buscarCliente(codCliente: string): Promise<any> {
    return this.clientService.getClientByCod(codCliente);
  }

  async onSubmit() {
    if (this.clienteForm.valid) {
      this.isLoading = true;
      try {
        const clienteData = {
          ...this.clienteForm.value
        };
        
        let resultado;
  
        if(this.clienteId){
          console.log(this.clienteId, clienteData)
          // Actualizar cliente
          resultado = await lastValueFrom(
            this.clientService.updateCliente(this.clienteId, clienteData)
          );
          console.log('Cliente actualizado:', resultado);
          if (resultado) {
            this.cargarDatosCliente(resultado);
            this.showAlert('success', 'Actualizado', 'Cliente actualizado correctamente');
          } else {
            throw new Error('No se recibió la respuesta esperada del servidor');
          }
        } else {
          // Crear cliente
          resultado = await lastValueFrom(this.clientService.createCliente(clienteData));
          console.log('Cliente creado:', resultado);
          if (resultado) {
            this.cargarDatosCliente(resultado);
            this.showAlert('success', 'Creado', 'Cliente creado correctamente');
          } else {
            throw new Error('No se recibió la respuesta esperada del servidor');
          }          
        }
  
      } catch (error) {
        console.error('Error al crear/actualizar cliente:', error);
        this.showAlert('error', 'Error', 'Error en la creación/actualización del cliente');
      } finally {
        this.isLoading = false;
      }
    } else {
      // Marcar todos los campos inválidos como touched para mostrar errores
      this.markFormGroupTouched(this.clienteForm);
      this.showAlert('warning', 'Advertencia', 'Complete todos los campos requeridos');
    }
  }
  
  // Función auxiliar para marcar campos como touched recursivamente
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
      if (control.invalid) {
        control.markAsTouched();
      }
    });
  }

  // Modificar resetForm para limpiar también la selección
resetForm() {
  this.clienteId = null; // Resetear el ID
  this.clienteForm.reset();
}

handleAction(action: string) {
  switch(action) {
    case 'search':
      // Implement search logic
      this.openClienteModal();
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
