import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserDataInterface } from '../../../core/interfaces/auth/user.interface';
import { LogoutModalComponent } from '../../modals/logout-modal/logout-modal.component';
import { CommonModule } from '@angular/common';


declare var bootstrap: any; // Add this line to declare bootstrap

@Component({
  selector: 'app-offcanvas-user-session',
  imports: [
    CommonModule,
    LogoutModalComponent,
    RouterLink
  ],
  templateUrl: './offcanvas-user-session.component.html',
  styleUrl: './offcanvas-user-session.component.css'
})
export class OffcanvasUserSessionComponent {

  
     // Access to logout modal component
     @ViewChild(LogoutModalComponent) logoutModal!: LogoutModalComponent;
  
     visible: boolean = false;
      userData: UserDataInterface | null = null;
     
   constructor(
      private authService: AuthService,
      private router:Router,
     ){}
   
     ngOnInit(): void {
       this.currentUser();
     }

     // Add this method to show the offcanvas
  show() {
    const offcanvasElement = document.getElementById('offcanvasUserSession');
    if (offcanvasElement) {
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
      bsOffcanvas.show();
    }
  }


       // Método para abrir el modal
       openLogoutModal() {
         this.logoutModal.showModal();
       }
       
         // Method to handle logout confirmation
     handleLogoutConfirm() {
       this.authService.logout();
       // Show success message (you can implement a Bootstrap toast here)
       this.showSuccessMessage('Sesión cerrada', 'Has cerrado sesión exitosamente');
       this.router.navigate(['/login']);
     }
     // Helper method to show success messages (replace PrimeNG toast)
     private showSuccessMessage(title: string, message: string) {
       // You can implement a Bootstrap toast here
       console.log(`${title}: ${message}`);
       // For now, we'll just log to console, but you could add a Bootstrap toast component later
     }
   
     currentUser() {
       this.userData = this.authService.getCurrentUserData();
       console.log('Datos del usuario:', this.userData);
     }

     scrollToTop(): void {
      document.documentElement.scrollTop = -10; // For modern browsers
      document.body.scrollTop = -10; // For compatibility with some browsers
    }
  
   
   }
   