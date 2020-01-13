import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraCardComponent } from './camera-card.component';

describe('CameraCardComponent', () => {
  let component: CameraCardComponent;
  let fixture: ComponentFixture<CameraCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
