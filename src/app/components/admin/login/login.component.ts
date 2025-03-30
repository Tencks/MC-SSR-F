import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginUserInterface } from '../../../core/interfaces/auth/user.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup |any ;
  isLoading = false;
  errorMessage = '';

  constructor(
    private auth_Service:AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.LoginForm = this.fb.group({
      identifier: ['', [Validators.required]], //aceptamos tanto name como email
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Modificar onSubmit para manejar tanto creación como actualización
onSubmit() {
  if (this.LoginForm.valid) {
    this.isLoading = true;
    this.errorMessage = '';

    const { identifier, password } = this.LoginForm.value;

    //determinamos si la entrada es de email o de name
    const credentials: LoginUserInterface = {
      email: identifier.includes('@') ? identifier : '',
      name: !identifier.includes('@') ? identifier : '',
      password //password la validamos antes line 34
    };

    this.auth_Service.login(credentials).subscribe({
      next: (response) => {
        console.log('Login Exitoso');
        this.router.navigate(['/dashbord']); //adaptar para poder redireccionar a otro link de ser necesario
      },
      error: (error) => {
        console.error('Error en login', error);
        this.errorMessage = error.error.message || 'Error al Iniciar Sesión';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  } else {
    this.LoginForm.markAllAsTouched();
  }
}

// Modificar resetForm para limpiar también la selección
resetForm() {
  this.LoginForm.reset();
  this.errorMessage ='';
}


}
