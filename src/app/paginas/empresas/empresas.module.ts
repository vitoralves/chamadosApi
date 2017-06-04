import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmpresasRoutingModule } from './empresas.routing.module';
import { EmpresasComponent } from './empresas.component';
import { PaginationModule } from 'ngx-bootstrap';
import { EmpresasDetalheComponent } from './empresas-detalhe/empresas-detalhe.component';

//provedores
import { EmpresasService } from './empresas.service';
import { EmpresasDetalheService } from './empresas-detalhe/empresas-detalhe.service';

import { TextMaskModule } from 'angular2-text-mask';

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
        EmpresasDetalheComponent
    ],
    providers: [EmpresasService, EmpresasDetalheService]
})
export class EmpresasModule { }
