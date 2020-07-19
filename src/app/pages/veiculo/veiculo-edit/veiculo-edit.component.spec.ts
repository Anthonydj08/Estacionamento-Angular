import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VeiculoEditComponent } from './veiculo-edit.component';
import { NbCardHeaderComponent, NbCardBodyComponent, NbCardFooterComponent, NbCardComponent, NbToastrService, NbToastrModule, NbOverlayModule, NbLayoutScrollService, NbLayoutRulerService, NbFocusTrapFactoryService } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from '../../../app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('VeiculoEditComponent', () => {

  let component: VeiculoEditComponent;
  let fixture: ComponentFixture<VeiculoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NbToastrModule.forRoot(),
        NbOverlayModule.forRoot()
      ],
      declarations: [
        VeiculoEditComponent,
        NbCardComponent,
        NbCardHeaderComponent,
        NbCardBodyComponent,
        NbCardFooterComponent,
        
      ],
      providers:[
        NbToastrService,
        NbLayoutScrollService,
        NbLayoutRulerService,
        NbFocusTrapFactoryService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createe', () => {


    expect(component).toBeTruthy();
    expect(component.cancelar).toBeTruthy();
  });
});
