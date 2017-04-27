import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { UtilService } from './util/util.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LogoutComponent
  ],
  providers: [UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
