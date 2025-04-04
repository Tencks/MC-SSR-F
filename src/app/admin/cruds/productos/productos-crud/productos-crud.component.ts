import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos-crud',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    // RouterLink
  ],
  templateUrl: './productos-crud.component.html',
  styleUrl: './productos-crud.component.css'
})
export class ProductosCrudComponent implements OnInit{
  // productoForm = {
  //   codigo: '',
  //   nombre: '',
  //   precio: 0,
  //   stock: 0,
  //   descripcion: ''
  // };

  productoForm: FormGroup |any ;
  stockForm: FormGroup |any ;
  especificacionesForm: FormGroup |any ;
  isLoading = false;

  //////otros//////
  atributosDinamicos: any;
  proveedores: any;
  

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.productoForm = this.fb.group({
      cod_producto: ['', [Validators.required]], 
      nombre: ['', [Validators.required]],
    });
  }

  // Modificar onSubmit para manejar tanto creación como actualización
onSubmit() {
  if (this.productoForm.valid) {
    this.isLoading = true;
  }
}

// Modificar resetForm para limpiar también la selección
resetForm() {
  this.productoForm.reset();
}


}