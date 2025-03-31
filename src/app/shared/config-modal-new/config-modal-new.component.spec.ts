import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigModalNewComponent } from './config-modal-new.component';

describe('ConfigModalNewComponent', () => {
  let component: ConfigModalNewComponent;
  let fixture: ComponentFixture<ConfigModalNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigModalNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigModalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
