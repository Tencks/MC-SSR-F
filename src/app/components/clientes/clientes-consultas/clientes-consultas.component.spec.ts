import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesConsultasComponent } from './clientes-consultas.component';

describe('ClientesConsultasComponent', () => {
  let component: ClientesConsultasComponent;
  let fixture: ComponentFixture<ClientesConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesConsultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
