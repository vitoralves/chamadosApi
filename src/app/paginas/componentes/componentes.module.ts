import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesComponent } from './componentes.component';
import { ComponentesRoutingModule } from './componentes.routing.module';
import { ComponentesService } from './componentes.service';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ComponentesRoutingModule, FormsModule],
  declarations: [ComponentesComponent],
  providers: [ComponentesService]
})
export class ComponentesModule { }
