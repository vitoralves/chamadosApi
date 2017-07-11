import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import { UtilService } from '../util/util.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private util: UtilService, private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
    if (this.util.usuarioAdmin()){
      return true;
    }
    this.router.navigate(['/pages/home']);
    return false;
  }
}
