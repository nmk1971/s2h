import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcuComponent } from './qcu.component';

describe('QcuComponent', () => {
  let component: QcuComponent;
  let fixture: ComponentFixture<QcuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QcuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
