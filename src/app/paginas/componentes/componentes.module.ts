import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesComponent } from './componentes.component';
import { ComponentesRoutingModule } from './componentes.routing.module';
import { ComponentesService } from './componentes.service';

import { FormsModule } from '@angular/forms';
import { ComponentesDetalheService } from './componentes-detalhe/componentes-detalhe.service';
import { ComponentesDetalheComponent } from './componentes-detalhe/componentes-detalhe.component';

@NgModule({
  imports: [CommonModule, ComponentesRoutingModule, FormsModule],
  declarations: [ComponentesComponent, ComponentesDetalheComponent],
  providers: [ComponentesService, ComponentesDetalheService]
})
export class ComponentesModule { }
