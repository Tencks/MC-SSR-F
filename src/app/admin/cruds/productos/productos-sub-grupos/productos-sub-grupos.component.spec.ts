import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosSubGruposComponent } from './productos-sub-grupos.component';

describe('ProductosSubGruposComponent', () => {
  let component: ProductosSubGruposComponent;
  let fixture: ComponentFixture<ProductosSubGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosSubGruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosSubGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
