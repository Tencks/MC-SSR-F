import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserProdModalComponent } from './browser-prod-modal.component';

describe('BrowserProdModalComponent', () => {
  let component: BrowserProdModalComponent;
  let fixture: ComponentFixture<BrowserProdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserProdModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserProdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
