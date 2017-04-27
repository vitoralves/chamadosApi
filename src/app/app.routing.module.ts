import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
// import { NaoEncontradoComponent } from './pages/nao-encontrado/nao-encontrado.component';

//rotas da aplicação
const appRoutes: Routes = [
  { path: '', loadChildren: './paginas/paginas.module#PaginasModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'logout', component: LogoutComponent },
  // { path: '**', component: NaoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
