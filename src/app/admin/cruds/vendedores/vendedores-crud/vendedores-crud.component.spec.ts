import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedoresCrudComponent } from './vendedores-crud.component';

describe('VendedoresCrudComponent', () => {
  let component: VendedoresCrudComponent;
  let fixture: ComponentFixture<VendedoresCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendedoresCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedoresCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
