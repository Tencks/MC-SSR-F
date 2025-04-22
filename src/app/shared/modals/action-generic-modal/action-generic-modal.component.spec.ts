import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionGenericModalComponent } from './action-generic-modal.component';

describe('ActionGenericModalComponent', () => {
  let component: ActionGenericModalComponent;
  let fixture: ComponentFixture<ActionGenericModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionGenericModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionGenericModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
