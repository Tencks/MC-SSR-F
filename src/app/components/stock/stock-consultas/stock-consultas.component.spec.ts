import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockConsultasComponent } from './stock-consultas.component';

describe('StockConsultasComponent', () => {
  let component: StockConsultasComponent;
  let fixture: ComponentFixture<StockConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockConsultasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
