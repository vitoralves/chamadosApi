import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios.routing.module';
import { PaginationModule } from 'ngx-bootstrap';

import { UsuariosDetalheComponent } from './usuarios-detalhe/usuarios-detalhe.component';
import { UsuariosComponent } from './usuarios.component';

//provedores
import { UsuariosService } from './usuarios.service';
import { UsuariosDetalheService } from './usuarios-detalhe/usuarios-detalhe.service';
import { EmpresasService } from './../empresas/empresas.service';

@NgModule({
    imports: [
        CommonModule,
        UsuariosRoutingModule,
        FormsModule,
        PaginationModule.forRoot()
    ],
    declarations: [
        UsuariosComponent,
        UsuariosDetalheComponent
    ],
    providers: [UsuariosService, UsuariosDetalheService, EmpresasService]
})
export class UsuariosModule { }
