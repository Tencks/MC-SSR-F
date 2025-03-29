import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginUserInterface } from '../../../core/interfaces/auth/user.interface';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user: LoginUserInterface= {
    name: '',
    email: '',
    password: ''
  };

  

  LoginForm: FormGroup | any;

  constructor(private api_auth:AuthService, private fb: FormBuilder) {}
  ngOnInit(): void {
    

    this.initForm();
  }

  initForm(){
    this.LoginForm = this.fb.group({
      username: [''],
      password: [''],
    })
  }

  // Modificar onSubmit para manejar tanto creación como actualización
onSubmit() {
 
}

// Modificar resetForm para limpiar también la selección
resetForm() {
  this.LoginForm?.reset();
  // this.user = null;
}


}
