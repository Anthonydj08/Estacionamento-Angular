import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculoListComponent } from './veiculo-list/veiculo-list.component';
import { VeiculoInsertComponent } from './veiculo-insert/veiculo-insert.component';
import { VeiculoEditComponent } from './veiculo-edit/veiculo-edit.component';
import { VeiculoComponent } from './veiculo.component';

const routes: Routes = [
    {
      path: '',
      component: VeiculoComponent,
      children: [
        {
          path: 'list',
          component: VeiculoListComponent,
        },
        {
          path: 'insert',
          component: VeiculoInsertComponent,
        },
        {
          path: 'edit',
          component: VeiculoEditComponent,
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
  export class VeiculoRoutingModule {
  }
  
  