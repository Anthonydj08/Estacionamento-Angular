import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@core/guards/auth.guard';
import { LoginGuard } from './@core/guards/login.guard';
const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('app/auth/auth.module')
      .then(m => m.NgxAuthModule),
      canActivate: [LoginGuard]
  },


  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
