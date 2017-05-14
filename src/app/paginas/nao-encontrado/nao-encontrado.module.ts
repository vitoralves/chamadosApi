import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NaoEncontradoComponent } from './nao-encontrado.component';
import { NaoEncontradoRoutingModule } from './nao-encontrado.routing.module';

@NgModule({
  imports: [NaoEncontradoRoutingModule],
  declarations: [NaoEncontradoComponent],
  providers: []
})
export class NaoEncontradoModule { }
