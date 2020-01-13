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
import { VeiculoRoutingModule } from './veiculo-routing.module';
import { VeiculoComponent } from './veiculo.component';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { VeiculoInsertComponent } from './veiculo-insert/veiculo-insert.component';
import { VeiculoEditComponent } from './veiculo-edit/veiculo-edit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
    VeiculoRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    VeiculoComponent,
    VeiculoListComponent,
    VeiculoInsertComponent,
    VeiculoEditComponent,
  ],
})
export class VeiculoModule { }
