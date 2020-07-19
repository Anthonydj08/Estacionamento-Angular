import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { InicioComponent } from './inicio.component';
import { ChartModule } from 'angular2-chartjs';

import { ShowcaseDialogComponent} from './showcase-dialog/showcase-dialog.component';


import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CameraCardComponent } from './camera-card/camera-card.component';
import { VagasCardComponent } from './vagas-card/vagas-card.component';
import { UsuariosCardComponent } from './usuarios-card/usuarios-card.component';
import { VeiculosCardComponent } from './veiculos-card/veiculos-card.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
  ],
  declarations: [
    InicioComponent,
    CameraCardComponent,
    ShowcaseDialogComponent,
    VagasCardComponent,
    UsuariosCardComponent,
    VeiculosCardComponent,
  ],
  providers: [
  ],
  entryComponents: [
    ShowcaseDialogComponent,
  ],
})
export class InicioModule { }
