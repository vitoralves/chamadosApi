import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas.routing.module';
import { EmpresasComponent } from './empresas.component';

@NgModule({
    imports: [
        CommonModule,
        EmpresasRoutingModule
    ],
    declarations: [
        EmpresasComponent
    ]
})
export class EmpresasModule { }
