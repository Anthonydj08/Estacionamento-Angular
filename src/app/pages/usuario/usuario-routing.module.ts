import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioInsertComponent } from './usuario-insert/usuario-insert.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
    {
      path: '',
      component: UsuarioComponent,
      children: [
        {
          path: 'list',
          component: UsuarioListComponent,
        },
        {
          path: 'insert',
          component: UsuarioInsertComponent,
        },
        {
          path: 'edit',
          component: UsuarioEditComponent,
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
  export class UsuarioRoutingModule {
  }
  
  