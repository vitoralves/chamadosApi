import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosDetalheComponent } from './usuarios-detalhe/usuarios-detalhe.component';

const routes: Routes = [
    { path: '', component: UsuariosComponent },
    { path: 'novo', component: UsuariosDetalheComponent },
    { path: ':id', component: UsuariosDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
