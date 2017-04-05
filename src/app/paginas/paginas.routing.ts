import { Routes, RouterModule }  from '@angular/router';

// import { Guarda } from './guarda/guarda';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';
import { Guarda } from '../guarda/guarda';

//rotas da aplicação
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [Guarda]},
  { path: 'logout', component: LogoutComponent, canActivate: [Guarda]},
];

export const routing = RouterModule.forChild(appRoutes);
