import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmFormComponent } from './qcm-form.component';

describe('QcmFormComponent', () => {
  let component: QcmFormComponent;
  let fixture: ComponentFixture<QcmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcmFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QcmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
