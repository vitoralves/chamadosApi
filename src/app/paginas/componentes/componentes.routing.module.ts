import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentesComponent } from './componentes.component';

const rota: Routes = [
    {path: '', component: ComponentesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(rota)],
  exports: [RouterModule]
})

export class ComponentesRoutingModule { }
