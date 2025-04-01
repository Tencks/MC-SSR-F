import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass, StyleClassModule } from 'primeng/styleclass';
import { Ripple, RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-prime-nav',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DrawerModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
  ],
  templateUrl: './prime-nav.component.html',
  styleUrl: './prime-nav.component.css'
})
export class PrimeNavComponent {
 
  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
      this.drawerRef.close(e);
  }

  visible: boolean = false;
}