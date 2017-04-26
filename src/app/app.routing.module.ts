import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

// import { NaoEncontradoComponent } from './pages/nao-encontrado/nao-encontrado.component';

//rotas da aplicação
const appRoutes: Routes = [
  { path: '', loadChildren: './paginas/login/login.module#LoginModule' },
  { path: 'login', loadChildren: './paginas/login/login.module#LoginModule' },
  // { path: '**', component: NaoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
