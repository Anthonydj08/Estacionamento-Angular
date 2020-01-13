import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaSaidaEntradaComponent } from './entrada-saida-entrada.component';

describe('EntradaSaidaEntradaComponent', () => {
  let component: EntradaSaidaEntradaComponent;
  let fixture: ComponentFixture<EntradaSaidaEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaSaidaEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaSaidaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
