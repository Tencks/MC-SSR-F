import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionBarComponent } from '../../../../shared/utils/action-bar/action-bar.component';
import { BrowserGenericComponent } from '../../../../shared/modals/browser-generic/browser-generic.component';
import { CommonModule } from '@angular/common';
import { ColumnConfig, FilterConfig } from '../../../../core/interfaces/BrowserGenericFiltrers.interface';
import { Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toasts/toast.service';
import { ProveedorService } from '../../../../core/services/proveedor/proveedor.service';
import { lastValueFrom } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proveedores-crud',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ActionBarComponent,
    BrowserGenericComponent
  ],
  templateUrl: './proveedores-crud.component.html',
  styleUrl: './proveedores-crud.component.css'
})
export class ProveedoresCrudComponent implements OnInit{
  @ViewChild('poveedorModal') poveedorModal!: BrowserGenericComponent;

  proveedorForm: FormGroup | any;
  isLoading: boolean = false;
  private provId: string | null = null;

  //Config del buscador
  proveedorFilters : FilterConfig[] = [
    { key: 'codProveedor', label: 'Código', type: 'text' },
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'grupo', label: 'Grupo', type: 'text' }
  ];

  proveedorColumns: ColumnConfig[] = [
    { key: 'codProveedor', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'grupo', label: 'Grupo' }
  ];

    // Listas para los selects
    tiposDocumento = ['DNI', 'CUIT', 'CUIL', 'Pasaporte'];
    condicionesIVA = ['Responsable Inscripto', 'Consumidor Final', 'Monotributista', 'Exento'];
    localidades = ['Las Rosas', 'Las Parejas', 'Armstrong', 'Cañada de Gomez', 'Carcarañá', 'Rosario','Los Cardos', 'El Trebol'];
    provincias = ['Buenos Aires', 'CABA', 'Córdoba', 'Santa Fe', 'Mendoza'];
    paises = ['Argentina', 'Chile', 'Bolivia', 'México', 'Estados Unidos'];

    constructor(
      private fb:FormBuilder,
      private router: Router,
      private location: Location,
      public provService: ProveedorService,
      private toastService: ToastService
    ){
      this.initForms();
    }

    ngOnInit(): void {}

    private initForms() {
      this.proveedorForm = this.fb.group({
        codProveedor: ['', Validators.required],
        fantasia: [''],
        nombre: ['', Validators.required],
        domicilio: [''],
        codLocalidad: [''],
        localidad: [''],
        provincia: [''],
        email: ['', Validators.email],
        sitioWeb: [''],
        telefonos: [''],
        otrosTel: [''],
        fax: [''],
        codZona: [''],
        zona: [''],
        condicionIVA: [''],
        cuit: [''],
        vtoCuit: [''],
        tipoCpa: [''],
        cai: [''],
        vtoCai: [''],
        ocPendienteActivacion: [false],
        importeMinimoOC: [0],
        codConcepto: [''],
        concepto: [''],
        conceptoActivo: [false],
        codCuentaCte: [''],
        cuentaCte: [''],
        codClienteCanje: [''],
        clienteCanje: [''],
        dctoProntoPago: [0],
        // Otros Datos
        notas: [''],
        diasPago: [''],
        porcentajePago: [0],
        lugarEntrega: [''],
        contactoVenta: [''],
        contactoCobranza: [''],
        horarios: [''],
        proveedorActivo: [true],
        // Retenciones
        agenteRetencion: [false],
        regGanancia: [''],
        tasaIVA: [''],
        categGanancias: [''],
        nroIngresosBrutos: [''],
        fechaVtoIIBB: [''],
        catIngresosBrutos: [''],
        inscriptoDrei: [false],
        alicuotaActividad: [''],
        coeficiente: [0],
        empleador: [false],
        fechaEmpleador: [''],
        regGananciaChatarra: [''],
        regIVAChatarra: [''],
        // Las tablas de reducciones y cuentas bancarias probablemente necesiten
        // una estructura de array de FormGroup, pero eso dependerá de cómo
        // quieras manejar esos datos
        reducciones: this.fb.array([]),
        cuentasBancarias: this.fb.array([])
      });
    }

    openProveedorModal(){
      this.poveedorModal.show();
    }

    onItemSelected(item: any) {
      // Guardar el ID del producto
      this.provId = item._id || item.id;
    
      this.proveedorForm.patchValue({
        codProveedor: item.codProveedor,
        nombre: item.nombre,
        fantasia: item.fantasia,
        //domicilioo
        domicilio: item.domicilio,
        localidad: item.localidad,
        provincia: item.provincia,
        email: item.email,
        sitioWeb: item.sitioWeb,
        telefonos: item.telefonos,
        otrosTel: item.otrosTel,
        zona: item.zona,
        condIVA: item.condicionIVA,
        cuit: item.cuit,
        vtoCuit: item.vtoCuit,
        tipoCpa: item.tipoCpa,
        cai: item.cai,
        vtoCai: item.vtoCai,
        ocPendienteActivacion: item.ocPendienteActivacion,
        importeMinimoOC: item.importeMinimoOC,
        concepto: item.concepto,
        conceptoActivo: item.conceptoActivo,
        cuentaCte: item.cuentaCte,
        clienteCanje: item.clienteCanje,
        dctoProntoPago: item.dctoProntoPago,
        notas: item.notas,
        diasPago: item.diasPago,
        porcentajePago: item.porcentajePago,
        lugarEntrega: item.lugarEntrega,
        contactoVenta: item.contactoVenta,
        contactoCobranza: item.contactoCobranza,
        horarios: item.horarios,
        proveedorActivo: item.proveedorActivo,
        //reten
        agenteRetencion: item.agenteRetencion,
        regGanancia: item.regGanancia,
        tasaIVA: item.tasaIVA,
        categGanancias: item.categGanancias,
        nroIngresosBrutos: item.nroIngresosBrutos,
        fechaVtoIIBB: item.fechaVtoIIBB,
        catIngresosBrutos: item.catIngresosBrutos,
        inscriptoDrei: item.inscriptoDrei,
        alicuotaActividad: item.alicuotaActividad,
        coeficiente: item.coeficiente,
        empleador: item.empleador,
        fechaEmpleador: item.fechaEmpleador,
        regGananciaChatarra: item.regGananciaChatarra,
        regIVAChatarra: item.regIVAChatarra,
        //active
      });
    

    }
    

    //Funcion Async para buscar productos por codigo
    async onCodigoKeyUp(event: KeyboardEvent){
      if (event.key === 'Enter'){
        const codCliente = this.proveedorForm.get('codCliente')?.value;
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
              this.showAlert('warning', 'Adventencia', 'Codigo desconocido');
            } finally {
              this.isLoading = false;
            }
          }
        }
      }
    
      //IMPORTANTE PARA APLICAR EN OTROS CASOS, TRAEMOS RESPONSE Y EN UNA CONST SACAMOS LA PARTE NECESARIA Y LA TRABAJAMOS
      private cargarDatosCliente(response: any) {
        if (!response) return;
    
        //extraccion del objeto cliente del response
        const prov = response.proveedor || response;
    
        this.provId = prov._id || prov.id;
    
        this.proveedorForm.patchValue({
          codProveedor: prov.codProveedor,
        nombre: prov.nombre,
        fantasia: prov.fantasia,
        //domicilioo
        domicilio: prov.domicilio,
        localidad: prov.localidad,
        provincia: prov.provincia,
        email: prov.email,
        sitioWeb: prov.sitioWeb,
        telefonos: prov.telefonos,
        otrosTel: prov.otrosTel,
        zona: prov.zona,
        condIVA: prov.condicionIVA,
        cuit: prov.cuit,
        vtoCuit: prov.vtoCuit,
        tipoCpa: prov.tipoCpa,
        cai: prov.cai,
        vtoCai: prov.vtoCai,
        ocPendienteActivacion: prov.ocPendienteActivacion,
        importeMinimoOC: prov.importeMinimoOC,
        concepto: prov.concepto,
        conceptoActivo: prov.conceptoActivo,
        cuentaCte: prov.cuentaCte,
        clienteCanje: prov.clienteCanje,
        dctoProntoPago: prov.dctoProntoPago,
        notas: prov.notas,
        diasPago: prov.diasPago,
        porcentajePago: prov.porcentajePago,
        lugarEntrega: prov.lugarEntrega,
        contactoVenta: prov.contactoVenta,
        contactoCobranza: prov.contactoCobranza,
        horarios: prov.horarios,
        proveedorActivo: prov.proveedorActivo,
        //reten
        agenteRetencion: prov.agenteRetencion,
        regGanancia: prov.regGanancia,
        tasaIVA: prov.tasaIVA,
        categGanancias: prov.categGanancias,
        nroIngresosBrutos: prov.nroIngresosBrutos,
        fechaVtoIIBB: prov.fechaVtoIIBB,
        catIngresosBrutos: prov.catIngresosBrutos,
        inscriptoDrei: prov.inscriptoDrei,
        alicuotaActividad: prov.alicuotaActividad,
        coeficiente: prov.coeficiente,
        empleador: prov.empleador,
        fechaEmpleador: prov.fechaEmpleador,
        regGananciaChatarra: prov.regGananciaChatarra,
        regIVAChatarra: prov.regIVAChatarra,
        })
    
      }
      
      private async buscarCliente(codProv: string): Promise<any> {
        return this.provService.getProvByCod(codProv);
      }
    
      async onSubmit() {
        if (this.proveedorForm.valid) {
          this.isLoading = true;
          try {
            const ProvData = {
              ...this.proveedorForm.value
            };
            
            let resultado;
      
            if(this.provId){
              console.log(this.provId, ProvData)
              // Actualizar cliente
              resultado = await lastValueFrom(
                this.provService.updateProv(this.provId, ProvData)
              );
              console.log('Proveedor actualizado:', resultado);
              if (resultado) {
                this.cargarDatosCliente(resultado);
                this.showAlert('success', 'Actualizado', 'Proveedor actualizado correctamente');
              } else {
                throw new Error('No se recibió la respuesta esperada del servidor');
              }
            } else {
              // Crear cliente
              resultado = await lastValueFrom(this.provService.createProv(ProvData));
              console.log('Proveedor creado:', resultado);
              if (resultado) {
                this.cargarDatosCliente(resultado);
                this.showAlert('success', 'Creado', 'Proveedor creado correctamente');
              } else {
                throw new Error('No se recibió la respuesta esperada del servidor');
              }          
            }
      
          } catch (error) {
            console.error('Error al crear/actualizar Proveedor:', error);
            this.showAlert('error', 'Error', 'Error en la creación/actualización del Proveedor');
          } finally {
            this.isLoading = false;
          }
        } else {
          // Marcar todos los campos inválidos como touched para mostrar errores
          this.markFormGroupTouched(this.proveedorForm);
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
      this.provId = null; // Resetear el ID
      this.proveedorForm.reset();
    }
    
    handleAction(action: string) {
      switch(action) {
        case 'search':
          // Implement search logic
          this.openProveedorModal();
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
