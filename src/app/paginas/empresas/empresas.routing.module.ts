import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './empresas.component';
import { EmpresasDetalheComponent } from './empresas-detalhe/empresas-detalhe.component';

const routes: Routes = [
    { path: '', component: EmpresasComponent },
    { path: 'novo', component: EmpresasDetalheComponent },
    { path: ':id', component: EmpresasDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
