import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil.routing.module';
import { PerfilService } from './perfil.service';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, PerfilRoutingModule, FormsModule],
  declarations: [PerfilComponent],
  providers: [PerfilService]
})
export class PerfilModule { }
