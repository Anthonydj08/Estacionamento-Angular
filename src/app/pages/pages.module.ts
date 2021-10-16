import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbInputModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { InicioModule } from './inicio/inicio.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsuarioModule } from './usuario/usuario.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { EntradaSaidaModule } from './entrada-saida/entrada-saida.module';
import { ConfiguracoesComponent } from './configuracoes/pages/configuracoes/configuracoes.component';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { VeiculosProibidosComponent } from './veiculos-proibidos/veiculos-proibidos.component';
import { NgxRegisterComponent } from './register/register.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    ngFormsModule,
    InicioModule,
    MiscellaneousModule,
    NbCardModule,
    UsuarioModule,
    VeiculoModule,
    EntradaSaidaModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    PagesComponent,
    ConfiguracoesComponent,
    RelatoriosComponent,
    VeiculosProibidosComponent,
    NgxRegisterComponent
  ],
})
export class PagesModule {
}
