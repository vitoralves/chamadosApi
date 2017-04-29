import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmpresasRoutingModule } from './empresas.routing.module';
import { EmpresasComponent } from './empresas.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        EmpresasRoutingModule,
        Ng2TableModule,
        FormsModule,
        PaginationModule.forRoot()
    ],
    declarations: [
        EmpresasComponent
    ]
})
export class EmpresasModule { }
