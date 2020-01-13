import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInsertComponent } from './usuario-insert.component';

describe('UsuarioInsertComponent', () => {
  let component: UsuarioInsertComponent;
  let fixture: ComponentFixture<UsuarioInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
