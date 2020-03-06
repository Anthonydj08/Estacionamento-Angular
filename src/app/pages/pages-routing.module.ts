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
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
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
