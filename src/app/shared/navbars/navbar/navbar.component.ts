import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ParametrosService } from '../../../services/parametros/parametros.service';
import { ConfigModalComponent } from '../../config-modal/config-modal.component';

@Component({
  selector: 'app-navbar',
  imports: [
    ConfigModalComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor( private api_params : ParametrosService) {}

  scrollToTop(): void {
    document.documentElement.scrollTop = -10; // Para navegadores modernos
    document.body.scrollTop = -10; // Para compatibilidad con algunos navegadores
  }



}