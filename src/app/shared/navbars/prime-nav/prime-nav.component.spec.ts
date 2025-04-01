import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNavComponent } from './prime-nav.component';

describe('PrimeNavComponent', () => {
  let component: PrimeNavComponent;
  let fixture: ComponentFixture<PrimeNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
