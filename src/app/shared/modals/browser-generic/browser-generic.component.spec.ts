import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserGenericComponent } from './browser-generic.component';

describe('BrowserGenericComponent', () => {
  let component: BrowserGenericComponent;
  let fixture: ComponentFixture<BrowserGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserGenericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
