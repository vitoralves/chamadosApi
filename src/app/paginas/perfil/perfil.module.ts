import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfilRoutingModule } from './perfil.routing.module';
import { PerfilComponent } from './perfil.component';

@NgModule({
    imports: [
        CommonModule,
        PerfilRoutingModule,
        FormsModule
    ],
    declarations: [
        PerfilComponent
    ]
})
export class PerfilModule { }
