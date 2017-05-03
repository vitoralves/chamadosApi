import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './empresas.component';
import { EmpresasNovoComponent } from './empresas-novo/empresas-novo.component';

const routes: Routes = [
    { path: '', component: EmpresasComponent },
    { path: 'novo', component: EmpresasNovoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
