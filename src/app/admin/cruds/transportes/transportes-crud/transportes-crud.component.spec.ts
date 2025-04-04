import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportesCrudComponent } from './transportes-crud.component';

describe('TransportesCrudComponent', () => {
  let component: TransportesCrudComponent;
  let fixture: ComponentFixture<TransportesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportesCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
