import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { PaginasComponent } from './paginas.component';
import { HomeComponent } from './home/home.component';

//rotas da aplicação
const appRoutes: Routes = [
  {
    path: 'pages', component: PaginasComponent,
    children: [
      { path: 'home', component: HomeComponent}
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
