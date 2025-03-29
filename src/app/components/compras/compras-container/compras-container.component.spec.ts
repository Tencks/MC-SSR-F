import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasContainerComponent } from './compras-container.component';

describe('ComprasContainerComponent', () => {
  let component: ComprasContainerComponent;
  let fixture: ComponentFixture<ComprasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
