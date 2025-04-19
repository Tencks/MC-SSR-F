import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGenericComponent } from './delete-generic.component';

describe('DeleteGenericComponent', () => {
  let component: DeleteGenericComponent;
  let fixture: ComponentFixture<DeleteGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
