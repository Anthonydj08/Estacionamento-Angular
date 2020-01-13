import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { EntradaSaidaRoutingModule } from './entrada-saida-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EntradaSaidaComponent } from './entrada-saida.component';
import { EntradaSaidaEntradaComponent } from './entrada-saida-entrada/entrada-saida-entrada.component';
import { EntradaSaidaSaidaComponent } from './entrada-saida-saida/entrada-saida-saida.component';
import { EntradaSaidaListComponent } from './entrada-saida-list/entrada-saida-list.component';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    EntradaSaidaRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    EntradaSaidaComponent,
    EntradaSaidaListComponent,
    EntradaSaidaEntradaComponent,
    EntradaSaidaSaidaComponent,
  ],
})
export class EntradaSaidaModule { }
