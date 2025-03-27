import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { empleadoInterface } from '../../models/employee';
import { ReactiveFormsModule, FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [
    ReactiveFormsModule,
    
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  empleados: empleadoInterface[]= [];

  selectedEmployee: empleadoInterface | null = null;

  employeeForm: FormGroup | any;

  constructor(private employeService:EmployeeService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getEmpleados()

    this.initForm();
  }

  initForm(){
    this.employeeForm = this.fb.group({
      name: [''],
      position: [''],
      office: [''],
      salary: [0]
    })
  }

// Modificar onSubmit para manejar tanto creación como actualización
onSubmit() {
  if (this.employeeForm?.valid) {
    if (this.selectedEmployee) {
      // Estamos editando - actualizar
      this.employeService.updateEmployee(this.selectedEmployee._id, this.employeeForm.value)
        .subscribe({
          next: (res) => {
            console.log('Empleado actualizado', res);
            this.getEmpleados();
            this.resetForm();
            this.selectedEmployee = null; // Limpiar selección
          },
          error: (err) => console.log(err),
          complete: () => console.log('Operación de actualización completada')
        });
    } else {
      // Estamos creando - agregar nuevo
      this.employeService.addEmployee(this.employeeForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.getEmpleados();
            this.resetForm();
          },
          error: (error) => console.log(error),
          complete: () => console.log('Operación de creación completada')
        });
    }
  }
}

// Modificar resetForm para limpiar también la selección
resetForm() {
  this.employeeForm?.reset();
  this.selectedEmployee = null;
}

  getEmpleados(){
    this.employeService.getEmployes().subscribe(
      res => {
        this.empleados = res,
        console.log('data en empleados',this.empleados)
      },
      error => console.log(error)
    )
  }

// FUNCION DELETE USANDO LA FORMA CORRECTA DEL SUSCRIBE DE LA 8V DEL METODO 
  deleteEmployee(_id: string) {
    const res = confirm('¿Estas seguro de eliminar el empleado?')
    if(res) {
      this.employeService.deleteEmployee(_id).subscribe({
        next: (response) => {
          console.log(response);
          this.getEmpleados();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          // Este callback es opcional, se ejecuta cuando el observable se completa
          console.log('Operación de eliminación completada');
        }
      });
    }
  }

 // Función para cargar los datos del empleado en el formulario
 editEmployee(empleado: empleadoInterface) {
  this.selectedEmployee = empleado;
  console.log('Empleado seleccionado:', empleado);
  // Cargar los datos en el formulario
  this.employeeForm.setValue({
    name: empleado.name,
    position: empleado.position,
    office: empleado.office,
    salary: empleado.salary
  });
}


}
