import { Component } from '@angular/core';
import { ConfigModalComponent } from '../../config-modal/config-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offcanvas',
  imports: [
    ConfigModalComponent,
    RouterLink
  ],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.css'
})
export class OffcanvasComponent {


  scrollToTop(): void {
    document.documentElement.scrollTop = -10; // Para navegadores modernos
    document.body.scrollTop = -10; // Para compatibilidad con algunos navegadores
  }


}
