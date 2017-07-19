import { ComponentesService } from './../componentes/componentes.service';
import { ProdutosService } from './../produtos/produtos.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsDetalheComponent } from './tickets-detalhe.component';
import { TicketsDetalheRoutingModule } from './tickets-detalhe.routing.module';
import { TicketsDetalheService } from './tickets-detalhe.service';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TicketsDetalheRoutingModule, FormsModule],
  declarations: [TicketsDetalheComponent, TicketsDetalheComponent],
  providers: [TicketsDetalheService, ProdutosService, ComponentesService]
})
export class TicketsDetalheModule { }
