import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { PaginasComponent } from './paginas.component';

//rotas da aplicação
const appRoutes: Routes = [
  {path: '', loadChildren: '../login/login.module#LoginModule'},
  {
    path: 'pages', component: PaginasComponent,
    children: [
      { path: 'nao-encontrado', loadChildren: './nao-encontrado/nao-encontrado.module#NaoEncontradoModule'},
      { path: 'home', loadChildren: './home/home.module#HomeModule'},
      { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilModule'},
      { path: 'empresas', loadChildren: './empresas/empresas.module#EmpresasModule'},
      { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosModule'},
      { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule'},
      { path: 'tickets/novo', loadChildren: './tickets/tickets.module#TicketsModule'},
      { path: 'componentes', loadChildren: './componentes/componentes.module#ComponentesModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule {}
