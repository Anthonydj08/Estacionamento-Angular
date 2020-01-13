import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoListComponent } from './veiculo-list.component';

describe('VeiculoListComponent', () => {
  let component: VeiculoListComponent;
  let fixture: ComponentFixture<VeiculoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
