import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProdutoComponentesComponent } from './produto-componentes.component';

//provedores
import { ProdutoComponentesService } from './produto-componentes.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ProdutoComponentesComponent
    ],
    providers: [ProdutoComponentesService]
})
export class ProdutoComponentesModule { }
