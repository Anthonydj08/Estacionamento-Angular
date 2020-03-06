import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { InicioModule } from './inicio/inicio.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsuarioModule } from './usuario/usuario.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { EntradaSaidaModule } from './entrada-saida/entrada-saida.module';
import { ConfiguracoesComponent } from './configuracoes/pages/configuracoes/configuracoes.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    InicioModule,
    MiscellaneousModule,
    NbCardModule,
    UsuarioModule,
    VeiculoModule,
    EntradaSaidaModule,
  ],
  declarations: [
    PagesComponent,
    ConfiguracoesComponent,   
  ],
})
export class PagesModule {
}
