import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsDetalheComponent } from './tickets-detalhe.component';

const rota: Routes = [
    {path: '', component: TicketsDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(rota)],
  exports: [RouterModule]
})

export class TicketsDetalheRoutingModule { }
