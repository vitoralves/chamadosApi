import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmpresaProdutosComponent } from './empresa-produtos.component';

//provedores
import { EmpresaProdutosService } from './empresa-produtos.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        EmpresaProdutosComponent
    ],
    providers: [EmpresaProdutosService]
})
export class EmpresaProdutosModule { }
