import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsComponent } from './tickets.component';

const rota: Routes = [
    {path: '', component: TicketsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(rota)],
  exports: [RouterModule]
})

export class TicketsRoutingModule { }
