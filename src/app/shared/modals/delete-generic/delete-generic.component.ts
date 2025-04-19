import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-generic',
  imports: [
    CommonModule
  ],
  template: `
    <div class="modal fade" [class.show]="visible" [style.display]="visible ? 'block' : 'none'" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">{{ title || 'Eliminar' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="hide()"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro que deseas eliminar {{ itemName ? 'el elemento "' + itemName + '"?' : 'este elemento?' }}</p>
            <p class="text-muted small">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="hide()">
              <i class="bi bi-x"></i> Cancelar
            </button>
            <button type="button" class="btn btn-danger" (click)="confirm()">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="visible"></div>
  `,
  styleUrl: './delete-generic.component.css'
})
export class DeleteGenericComponent {
@Input() title: string = '';
@Input() itemName: string = '';

visible: boolean = false;

@Output() onConfirm = new EventEmitter<void>();

show() {
  this.visible = true;
  document.body.classList.add('modal-open');
}

hide() {
  this.visible = false;
  document.body.classList.remove('modal-open');
}

confirm() {
  this.onConfirm.emit();
  this.hide();
}


}
