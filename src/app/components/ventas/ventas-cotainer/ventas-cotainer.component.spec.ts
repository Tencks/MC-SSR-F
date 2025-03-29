import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasCotainerComponent } from './ventas-cotainer.component';

describe('VentasCotainerComponent', () => {
  let component: VentasCotainerComponent;
  let fixture: ComponentFixture<VentasCotainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasCotainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasCotainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
