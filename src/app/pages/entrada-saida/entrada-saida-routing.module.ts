import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntradaSaidaComponent } from './entrada-saida.component';
import { EntradaSaidaListComponent } from './entrada-saida-list/entrada-saida-list.component';
import { EntradaSaidaEntradaComponent } from './entrada-saida-entrada/entrada-saida-entrada.component';
import { EntradaSaidaSaidaComponent } from './entrada-saida-saida/entrada-saida-saida.component';
import { EntradaSaidaModule } from './entrada-saida.module';
import { EntradaSaidaMostrarComponent } from './entrada-saida-mostrar/entrada-saida-mostrar.component';

const routes: Routes = [
    {
      path: '',
      component: EntradaSaidaComponent,
      children: [
        {
          path: 'list',
          component: EntradaSaidaListComponent,
        },
        {
          path: 'entrada',
          component: EntradaSaidaEntradaComponent,
        },
        {
          path: 'saida',
          component: EntradaSaidaSaidaComponent,
        },
        {
          path: 'mostrar',
          component: EntradaSaidaMostrarComponent,
        },
        
      ],
    },
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes),
      
    ],
    exports: [
      RouterModule,
    ],
  })
  export class EntradaSaidaRoutingModule {
  }
  
  