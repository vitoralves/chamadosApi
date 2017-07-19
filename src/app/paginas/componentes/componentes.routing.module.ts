import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentesComponent } from './componentes.component';
import { ComponentesDetalheComponent } from './componentes-detalhe/componentes-detalhe.component';

const rota: Routes = [
    {path: '', component: ComponentesComponent},
    { path: 'novo', component: ComponentesDetalheComponent },
    { path: ':id', component: ComponentesDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(rota)],
  exports: [RouterModule]
})

export class ComponentesRoutingModule { }
