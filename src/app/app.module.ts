import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

import { UtilService } from './util/util.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from "app/guarda/authGuard";
import { AdminGuard } from "app/guarda/adminGuard";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LogoutComponent
  ],
  providers: [UtilService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

