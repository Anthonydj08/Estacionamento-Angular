import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ConfiguracoesComponent } from './configuracoes/pages/configuracoes/configuracoes.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'inicio',
      component: InicioComponent,
    },
    {
      path: 'usuario',
      loadChildren: () => import('./usuario/usuario.module')
        .then(m => m.UsuarioModule),
    },
    {
      path: 'veiculo',
      loadChildren: () => import('./veiculo/veiculo.module')
        .then(m => m.VeiculoModule),
    },
    {
      path: 'entrada-saida',
      loadChildren: () => import('./entrada-saida/entrada-saida.module')
        .then(m => m.EntradaSaidaModule),
    },
    {
      path: 'auth',
      loadChildren: () => import('../auth/auth.module')
        .then(m => m.NgxAuthModule),
    },
    {
      path: 'configuracoes',
      component: ConfiguracoesComponent,
    },
    {
      path: '',
      redirectTo: 'inicio',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
