import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCrudComponent } from './clientes-crud.component';

describe('ClientesCrudComponent', () => {
  let component: ClientesCrudComponent;
  let fixture: ComponentFixture<ClientesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
