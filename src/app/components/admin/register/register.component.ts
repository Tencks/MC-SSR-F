import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterUserInterface } from '../../../core/interfaces/auth/user.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from '../../../core/services/toasts/toast.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ToastrModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  RegisterForm: FormGroup | any;
  isLoading = false;
  errorMessage = '';
  showSuccessDialog: boolean = false;

  constructor(
    private auth_Service:AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.RegisterForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Modificar onSubmit para manejar tanto creación como actualización
onSubmit() {
  if (this.RegisterForm.valid) {
    this.isLoading = true;
    this.errorMessage = '';

    const { name, email, password1, password2 } = this.RegisterForm.value;
    
    if (password1 !== password2) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.isLoading = false;
      return;
    }

    //verificar si la contraseña tiene el mismo largo
    if (password1.length !== password2.length) {
      this.errorMessage = 'Las contraseñas no tienen el mismo largo';
      this.isLoading = false;
      return;
    }

    // Crear objeto de credenciales para el registro
    const credentials: RegisterUserInterface = {
      name,
      email,
      password: password1, // Enviamos solo password1 ya que ya verificamos que son iguales
      role: 'user' // Rol por defecto, ajustar según necesidades
    };

    this.auth_Service.register(credentials).subscribe({
      next: (response) => {
        console.log('Registro Exitoso');
        this.showSuccessDialog = true; //mostamos el modal de primeNG
        // this.router.navigate(['/login']); //adaptar para poder redireccionar a otro link de ser necesario
      },
      error: (error) => {
        console.error('Error en registro', error);
        this.showAlert('error', 'Error en registro', 'Hubo un error en el registro. Por favor, inténtalo de nuevo.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  } else {
    this.RegisterForm.markAllAsTouched();
  }
}

confirmRegistration(){
  this.showSuccessDialog = false;
  this.router.navigate(['/login']); //ruteamos a login luego de confirmar el modal
}

// Modificar resetForm para limpiar también la selección
resetForm() {
  this.RegisterForm.reset();
  this.errorMessage ='';
}

private showAlert(type: string, title: string, message: string) {
  this.toastService.showToast(
    type as 'success' | 'error' | 'warning' | 'info',
    title,
    message
  );
}


}
