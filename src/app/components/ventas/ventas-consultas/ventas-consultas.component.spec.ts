import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasConsultasComponent } from './ventas-consultas.component';

describe('VentasConsultasComponent', () => {
  let component: VentasConsultasComponent;
  let fixture: ComponentFixture<VentasConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasConsultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
