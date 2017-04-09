import { Routes, RouterModule }  from '@angular/router';

// import { Guarda } from './guarda/guarda';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { Guarda } from '../guarda/guarda';
import { AppComponent } from '../app.component';
import { PaginasComponent } from './paginas.component';
import { PerfilComponent } from './perfil/perfil.component';

//rotas da aplicação
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent, canActivate: [Guarda]},
  {
    path: 'pages',
    component: PaginasComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [Guarda]},
      { path: 'perfil', component: PerfilComponent, canActivate: [Guarda]},
    ]
  }
];

export const routing = RouterModule.forChild(appRoutes);
