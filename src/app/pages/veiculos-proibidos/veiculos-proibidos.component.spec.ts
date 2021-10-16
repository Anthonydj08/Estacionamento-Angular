import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculosProibidosComponent } from './veiculos-proibidos.component';

describe('VeiculosProibidosComponent', () => {
  let component: VeiculosProibidosComponent;
  let fixture: ComponentFixture<VeiculosProibidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculosProibidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculosProibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
