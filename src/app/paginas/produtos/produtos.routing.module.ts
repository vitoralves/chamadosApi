import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos.component';
//import { ProdutosDetalheComponent } from './produtos-detalhe/produtos-detalhe.component';

const routes: Routes = [
    { path: '', component: ProdutosComponent },
  //  { path: 'novo', component: ProdutosDetalheComponent },
    //{ path: ':id', component: ProdutosDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
