import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesSubGruposComponent } from './clientes-sub-grupos.component';

describe('ClientesSubGruposComponent', () => {
  let component: ClientesSubGruposComponent;
  let fixture: ComponentFixture<ClientesSubGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesSubGruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesSubGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
