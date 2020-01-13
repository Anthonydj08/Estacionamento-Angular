import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaSaidaSaidaComponent } from './entrada-saida-saida.component';

describe('EntradaSaidaSaidaComponent', () => {
  let component: EntradaSaidaSaidaComponent;
  let fixture: ComponentFixture<EntradaSaidaSaidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaSaidaSaidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaSaidaSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
