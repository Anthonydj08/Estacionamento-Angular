import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaSaidaListComponent } from './entrada-saida-list.component';

describe('EntradaSaidaListComponent', () => {
  let component: EntradaSaidaListComponent;
  let fixture: ComponentFixture<EntradaSaidaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaSaidaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaSaidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
