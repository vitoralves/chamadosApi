import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';

import { PaginasRoutingModule } from './paginas.routing.module';
import { PaginasComponent } from './paginas.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { UtilService } from '../util/util.service';
import { ProdutosComponent } from './produtos/produtos.component';

@NgModule({
  imports: [
    CommonModule,
    PaginasRoutingModule
  ],
  declarations: [
    PaginasComponent,
    HeaderComponent,
    FooterComponent,
    ProdutosComponent
  ]
})

export class PaginasModule {
}
