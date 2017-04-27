import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { PaginasComponent } from './paginas.component';

//rotas da aplicação
const appRoutes: Routes = [
  {path: '', loadChildren: '../login/login.module#LoginModule'},
  {    
    path: 'pages', component: PaginasComponent,
    children: [
      { path: 'home', loadChildren: './home/home.module#HomeModule'}
      /*{ path: 'perfil', component: PerfilComponent, loadChildren: './paginas.module#PaginasModule'},*/
      //{ path: 'empresas', loadChildren: './empresas/empresas.module#EmpresasModule', canActivate: [Guarda]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule {}
