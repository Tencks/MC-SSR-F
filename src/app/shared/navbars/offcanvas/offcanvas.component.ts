import { Component, OnInit } from '@angular/core';
import { ConfigModalComponent } from '../../config-modal/config-modal.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserDataInterface } from '../../../core/interfaces/auth/user.interface';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfigModalNewComponent } from '../../config-modal-new/config-modal-new.component';

@Component({
  selector: 'app-offcanvas',
  imports: [
    // ConfigModalComponent,
    ConfigModalNewComponent,
    ButtonModule,
    RouterLink,
    CommonModule,
    // RouterLinkActive,
    DialogModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.css',
  providers:[MessageService]
})
export class OffcanvasComponent implements OnInit{
  visible: boolean = false;
   userData: UserDataInterface | null = null;
  
constructor(
   private authService: AuthService,
   private router:Router,
   private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.currentUser();
  }

  scrollToTop(): void {
    document.documentElement.scrollTop = -10; // Para navegadores modernos
    document.body.scrollTop = -10; // Para compatibilidad con algunos navegadores
  }

  currentUser() {
    this.userData = this.authService.getCurrentUserData();
    console.log('Datos del usuario:', this.userData);
  }

  showLogoutDialog() {
    this.visible = true;
  }

  confirmLogout() {
    this.authService.logout();
    this.visible = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Sesión cerrada',
      detail: 'Has cerrado sesión exitosamente'
    });
    this.router.navigate(['/login']);
  }

}
