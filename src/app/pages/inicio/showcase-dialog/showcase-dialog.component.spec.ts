import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseDialogComponent } from './showcase-dialog.component';

describe('ShowcaseDialogComponent', () => {
  let component: ShowcaseDialogComponent;
  let fixture: ComponentFixture<ShowcaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
