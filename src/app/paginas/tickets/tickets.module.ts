import { ComponentesService } from './../componentes/componentes.service';
import { ProdutosService } from './../produtos/produtos.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsComponent } from './tickets.component';
import { TicketsRoutingModule } from './tickets.routing.module';
import { TicketsService } from './tickets.service';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TicketsRoutingModule, FormsModule],
  declarations: [TicketsComponent],
  providers: [TicketsService, ProdutosService, ComponentesService]
})
export class TicketsModule { }
