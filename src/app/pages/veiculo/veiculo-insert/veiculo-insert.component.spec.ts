import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoInsertComponent } from './veiculo-insert.component';

describe('VeiculoInsertComponent', () => {
  let component: VeiculoInsertComponent;
  let fixture: ComponentFixture<VeiculoInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
