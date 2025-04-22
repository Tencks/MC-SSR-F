import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-generic-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="modal fade" [class.show]="visible" [style.display]="visible ? 'block' : 'none'" 
         tabindex="-1" role="dialog" aria-labelledby="actionModalLabel" aria-hidden="true">
      <div class="modal-dialog" [style.max-width]="modalWidth" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="actionModalLabel">{{ title || 'Confirmar Acción' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="hide()"></button>
          </div>
          <div class="modal-body">
            <p>{{ message || '¿Estás seguro que deseas realizar esta acción?' }}</p>
            <p class="text-muted small" *ngIf="subMessage">{{ subMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="hide()">
              <i [class]="cancelIcon"></i> {{ cancelText  }}
            </button>
            <button type="button" [class]="'btn ' + confirmButtonClass" (click)="confirm()">
              <i [class]="confirmIcon"></i> {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="visible"></div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class ActionGenericModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() subMessage: string = '';
  @Input() modalWidth: string = '500px';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmIcon: string = 'bi bi-check';
  @Input() cancelIcon: string = 'bi bi-x';
  @Input() confirmButtonClass: string = 'btn-primary';

  visible: boolean = false;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  show() {
    this.visible = true;
    document.body.classList.add('modal-open');
  }

  hide() {
    this.visible = false;
    document.body.classList.remove('modal-open');
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit();
    this.hide();
  }
}
