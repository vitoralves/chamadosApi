import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos.routing.module';
import { ProdutosComponent } from './produtos.component';
import { PaginationModule } from 'ngx-bootstrap';
import { ProdutosDetalheComponent } from './produtos-detalhe/produtos-detalhe.component';

//provedores
import { ProdutosService } from './produtos.service';
import { ProdutosDetalheService } from './produtos-detalhe/produtos-detalhe.service';

import { TextMaskModule } from 'angular2-text-mask';

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
        ProdutosDetalheComponent
    ],
    providers: [ProdutosService, ProdutosDetalheService]
})
export class ProdutosModule { }
