import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GralFilesCrudComponent } from './gral-files-crud.component';

describe('GralFilesCrudComponent', () => {
  let component: GralFilesCrudComponent;
  let fixture: ComponentFixture<GralFilesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GralFilesCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GralFilesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
