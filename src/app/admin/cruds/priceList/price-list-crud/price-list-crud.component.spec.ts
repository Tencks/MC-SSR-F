import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListCrudComponent } from './price-list-crud.component';

describe('PriceListCrudComponent', () => {
  let component: PriceListCrudComponent;
  let fixture: ComponentFixture<PriceListCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceListCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceListCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
