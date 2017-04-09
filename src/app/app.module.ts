import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { HeaderService } from './header/header.service';
import { UtilService } from './util/util.service';
import { Guarda } from './guarda/guarda';

import { routing } from './app.routing';
import { PaginasModule } from './paginas/paginas.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    PaginasModule
  ],
  providers: [HeaderService, UtilService, Guarda],
  bootstrap: [AppComponent]
})
export class AppModule { }
