import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculosCardComponent } from './veiculos-card.component';

describe('VeiculosCardComponent', () => {
  let component: VeiculosCardComponent;
  let fixture: ComponentFixture<VeiculosCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculosCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
