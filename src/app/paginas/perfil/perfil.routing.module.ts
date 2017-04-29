import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilComponent } from './perfil.component';

const rota: Routes = [
    {path: '', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(rota)],
  exports: [RouterModule]
})

export class PerfilRoutingModule { }
