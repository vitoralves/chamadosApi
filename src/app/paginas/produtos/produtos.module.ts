import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos.routing.module';
import { ProdutosComponent } from './produtos.component';
import { Ng2TableModule } from 'ng2-table/ng2-table'; //https://github.com/valor-software/ng2-table
import { PaginationModule } from 'ngx-bootstrap';
//import { ProdutosDetalheComponent } from './produtos-detalhe/produtos-detalhe.component';

//provedores
import { ProdutosService } from './produtos.service';
//import { ProdutosDetalheService } from './produtos-detalhe/produtos-detalhe.service';

import { TextMaskModule } from 'angular2-text-mask';
import { ProdutosDetalheComponent } from './produtos-detalhe/produtos-detalhe.component';

@NgModule({
    imports: [
        CommonModule,
        ProdutosRoutingModule,
        Ng2TableModule,
        FormsModule,
        PaginationModule.forRoot(),
        TextMaskModule
    ],
    declarations: [
        ProdutosComponent,
        ProdutosDetalheComponent,
        //ProdutosDetalheComponent
    ],
    providers: [ProdutosService, 
    //ProdutosDetalheService
    ]
})
export class ProdutosModule { }
