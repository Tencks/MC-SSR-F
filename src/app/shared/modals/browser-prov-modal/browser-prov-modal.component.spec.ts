import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserProvModalComponent } from './browser-prov-modal.component';

describe('BrowserProvModalComponent', () => {
  let component: BrowserProvModalComponent;
  let fixture: ComponentFixture<BrowserProvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserProvModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserProvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
