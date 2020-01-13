import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasCardComponent } from './vagas-card.component';

describe('VagasCardComponent', () => {
  let component: VagasCardComponent;
  let fixture: ComponentFixture<VagasCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagasCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
