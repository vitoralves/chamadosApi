import { Component, OnInit } from '@angular/core';

import { UtilService } from '../../util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {

  constructor(private util: UtilService, private rota: Router) {
    this.util.logout();
    this.rota.navigate(['/login']);
  }

}
