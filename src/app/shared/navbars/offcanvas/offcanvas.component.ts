import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigModalComponent } from '../../modals/config-modal/config-modal.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserDataInterface } from '../../../core/interfaces/auth/user.interface';
import { CommonModule, Location } from '@angular/common';
import { OffcanvasUserSessionComponent } from '../offcanvas-user-session/offcanvas-user-session.component';

@Component({
  selector: 'app-offcanvas',
  imports: [
    RouterLink,
    CommonModule,
    ConfigModalComponent,
    OffcanvasUserSessionComponent
],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.css',
})
export class OffcanvasComponent implements OnInit{
  // Añade esta línea para acceder al componente modal
  @ViewChild(ConfigModalComponent) configModal!: ConfigModalComponent;
    // Access to component userSession
    @ViewChild('userSession') userSession!: OffcanvasUserSessionComponent;
  
  visible: boolean = false;
   userData: UserDataInterface | null = null;
  
constructor(
   private authService: AuthService,
   private router:Router,
   private location: Location
  ){}

  ngOnInit(): void {
    this.currentUser();
  }

// Add this to your component class
activeSections = {
  favorites: false,
  applications: false
};

toggleSection(section: 'favorites' | 'applications') {
  this.activeSections[section] = !this.activeSections[section];
  console.log('toggleSection');
  
}

  // Método para abrir el modal
  openConfigModal() {
    this.configModal.showModal();
  }
  

  scrollToTop(): void {
    document.documentElement.scrollTop = -10; // For modern browsers
    document.body.scrollTop = -10; // For compatibility with some browsers
  }

  currentUser() {
    this.userData = this.authService.getCurrentUserData();
    console.log('Datos del usuario:', this.userData);
  }

  showUserSession(){
    this.userSession.show(); // Assuming your user session component has a show() method
  }

  goBack(): void {
    this.location.back();
  }
}
