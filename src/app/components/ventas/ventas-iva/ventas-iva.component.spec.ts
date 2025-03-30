import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasIVAComponent } from './ventas-iva.component';

describe('VentasIVAComponent', () => {
  let component: VentasIVAComponent;
  let fixture: ComponentFixture<VentasIVAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasIVAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasIVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
