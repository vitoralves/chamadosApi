import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaginasRoutingModule } from './paginas.routing.module';
import { PaginasComponent } from './paginas.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { UtilService } from '../util/util.service';

@NgModule({
  imports: [
    CommonModule,
    PaginasRoutingModule,
    FormsModule
  ],
  declarations: [
    PaginasComponent,
    HeaderComponent,
    FooterComponent,
  ]
})

export class PaginasModule {
}
