import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosConsultasComponent } from './productos-consultas.component';

describe('ProductosConsultasComponent', () => {
  let component: ProductosConsultasComponent;
  let fixture: ComponentFixture<ProductosConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosConsultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
