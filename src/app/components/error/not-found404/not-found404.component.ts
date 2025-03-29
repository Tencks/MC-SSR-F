import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found404',
  imports: [
    RouterLink
  ],
  templateUrl: './not-found404.component.html',
  styleUrl: './not-found404.component.css'
})
export class NotFound404Component implements OnInit {
constructor(private location: Location) {}

  ngOnInit(): void {
  }
  
  goBack(): void {
    this.location.back();
  }
}
