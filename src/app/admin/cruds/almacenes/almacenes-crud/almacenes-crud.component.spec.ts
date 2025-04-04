import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenesCrudComponent } from './almacenes-crud.component';

describe('AlmacenesCrudComponent', () => {
  let component: AlmacenesCrudComponent;
  let fixture: ComponentFixture<AlmacenesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenesCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
