import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasConsultasComponent } from './compras-consultas.component';

describe('ComprasConsultasComponent', () => {
  let component: ComprasConsultasComponent;
  let fixture: ComponentFixture<ComprasConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasConsultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
