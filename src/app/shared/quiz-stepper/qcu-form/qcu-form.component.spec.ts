import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcuFormComponent } from './qcu-form.component';

describe('QcuFormComponent', () => {
  let component: QcuFormComponent;
  let fixture: ComponentFixture<QcuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcuFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QcuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
