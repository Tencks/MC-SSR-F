import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserCliModalComponent } from './browser-cli-modal.component';

describe('BrowserCliModalComponent', () => {
  let component: BrowserCliModalComponent;
  let fixture: ComponentFixture<BrowserCliModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserCliModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserCliModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
