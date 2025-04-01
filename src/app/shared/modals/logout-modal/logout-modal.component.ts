import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  template:`
  
 <!-- Modal Bootstrap para Logout -->
 <div class="modal fade" [class.show]="visible" [style.display]="visible ? 'block' : 'none'" tabindex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logoutModalLabel">Cerrar Sesión</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="hideModal()"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro que deseas cerrar sesión?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="hideModal()">
              <i class="bi bi-x"></i> Cancelar
            </button>
            <button type="button" class="btn btn-danger" (click)="confirm()">
              <i class="bi bi-box-arrow-right"></i> Desconectarse
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Backdrop para el modal -->
    <div class="modal-backdrop fade show" *ngIf="visible"></div>
  `,
  styles: []
})
export class LogoutModalComponent {
   visible: boolean = false;
  @Output() onConfirm = new EventEmitter<void>();

  showModal() {
    this.visible = true;
    document.body.classList.add('modal-open'); //previene el scroll del body
  }

  hideModal() {
    this.visible = false;
    document.body.classList.remove('modal-open'); //vuelve a habilitar el scroll del body
  }

  confirm(){
    this.onConfirm.emit();
    this.hideModal();
  }

  

}
