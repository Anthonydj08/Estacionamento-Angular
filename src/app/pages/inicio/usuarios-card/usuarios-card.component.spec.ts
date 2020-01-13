import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCardComponent } from './usuarios-card.component';

describe('UsuariosCardComponent', () => {
  let component: UsuariosCardComponent;
  let fixture: ComponentFixture<UsuariosCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
