import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos.routing.module';
import { ProdutosComponent } from './produtos.component';
import { PaginationModule } from 'ngx-bootstrap';
import { ProdutosDetalheComponent } from './produtos-detalhe/produtos-detalhe.component';

//provedores
import { ProdutosService } from './produtos.service';
import { ProdutoComponentesService } from './produto-componentes/produto-componentes.service';
import { ProdutosDetalheService } from './produtos-detalhe/produtos-detalhe.service';

import { TextMaskModule } from 'angular2-text-mask';
import { ProdutoComponentesComponent } from './produto-componentes/produto-componentes.component';
@NgModule({
    imports: [
        CommonModule,
        ProdutosRoutingModule,
        FormsModule,
        PaginationModule.forRoot(),
        TextMaskModule
    ],
    declarations: [
        ProdutosComponent,
        ProdutosDetalheComponent,
        ProdutoComponentesComponent
    ],
    providers: [ProdutosService, ProdutosDetalheService, ProdutoComponentesService]
})
export class ProdutosModule { }
