import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosGruposComponent } from './productos-grupos.component';

describe('ProductosGruposComponent', () => {
  let component: ProductosGruposComponent;
  let fixture: ComponentFixture<ProductosGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosGruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
