import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmpresasRoutingModule } from './empresas.routing.module';
import { PaginationModule } from 'ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { EmpresasDetalheComponent } from './empresas-detalhe/empresas-detalhe.component';
import { EmpresaProdutosComponent } from './empresa-produtos/empresa-produtos.component';
import { EmpresasComponent } from './empresas.component';

//provedores
import { EmpresasService } from './empresas.service';
import { EmpresasDetalheService } from './empresas-detalhe/empresas-detalhe.service';
import { EmpresaProdutosService } from './empresa-produtos/empresa-produtos.service';


@NgModule({
    imports: [
        CommonModule,
        EmpresasRoutingModule,
        FormsModule,
        PaginationModule.forRoot(),
        TextMaskModule
    ],
    declarations: [
        EmpresasComponent,
        EmpresasDetalheComponent,
        EmpresaProdutosComponent
    ],
    providers: [EmpresasService, EmpresasDetalheService, EmpresaProdutosService]
})
export class EmpresasModule { }
