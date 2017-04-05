import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './paginas.routing';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [CommonModule,routing,FormsModule],
  declarations: [LoginComponent, HomeComponent, LogoutComponent]
})

export class PaginasModule {
}
