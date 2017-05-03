import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmpresasRoutingModule } from './empresas.routing.module';
import { EmpresasComponent } from './empresas.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { EmpresasNovoComponent } from './empresas-novo/empresas-novo.component';

//provedores
import { EmpresasService } from './empresas.service';
import { EmpresasNovoService } from './empresas-novo/empresas-novo.service';

@NgModule({
    imports: [
        CommonModule,
        EmpresasRoutingModule,
        Ng2TableModule,
        FormsModule,
        PaginationModule.forRoot()
    ],
    declarations: [
        EmpresasComponent,
        EmpresasNovoComponent
    ],
    providers: [EmpresasService, EmpresasNovoService]
})
export class EmpresasModule { }
