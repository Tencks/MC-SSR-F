import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesGruposComponent } from './clientes-grupos.component';

describe('ClientesGruposComponent', () => {
  let component: ClientesGruposComponent;
  let fixture: ComponentFixture<ClientesGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesGruposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
