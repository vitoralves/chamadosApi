import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './paginas.routing';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { PaginasComponent } from './paginas.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EmpresasComponent } from './empresas/empresas.component';

@NgModule({
  imports: [CommonModule,routing,FormsModule],
  declarations: [LoginComponent, HomeComponent, LogoutComponent, PaginasComponent, HeaderComponent, FooterComponent, PerfilComponent, EmpresasComponent]
})

export class PaginasModule {
}
