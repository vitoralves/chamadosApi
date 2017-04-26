import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        EmpresasRoutingModule
    ],
    declarations: [
        EmpresasComponent,
        /*HeaderComponent,
        FooterComponent*/
    ]
})
export class EmpresasModule { }
