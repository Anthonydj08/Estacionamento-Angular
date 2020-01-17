import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaSaidaMostrarComponent } from './entrada-saida-mostrar.component';

describe('EntradaSaidaMostrarComponent', () => {
  let component: EntradaSaidaMostrarComponent;
  let fixture: ComponentFixture<EntradaSaidaMostrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaSaidaMostrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaSaidaMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
