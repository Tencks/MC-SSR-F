import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasSIVAComponent } from './ventas-siva.component';

describe('VentasSIVAComponent', () => {
  let component: VentasSIVAComponent;
  let fixture: ComponentFixture<VentasSIVAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasSIVAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasSIVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
