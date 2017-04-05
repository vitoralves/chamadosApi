import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

// import { NaoEncontradoComponent } from './pages/nao-encontrado/nao-encontrado.component';

//rotas da aplicação
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: NaoEncontradoComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
