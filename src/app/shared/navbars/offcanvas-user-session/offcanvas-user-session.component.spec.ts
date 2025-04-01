import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffcanvasUserSessionComponent } from './offcanvas-user-session.component';

describe('OffcanvasUserSessionComponent', () => {
  let component: OffcanvasUserSessionComponent;
  let fixture: ComponentFixture<OffcanvasUserSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffcanvasUserSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffcanvasUserSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
