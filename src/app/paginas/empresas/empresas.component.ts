import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { EmpresasService } from './empresas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
  providers: [EmpresasService]
})
export class EmpresasComponent implements OnInit {

  empresas: any;

  constructor(private rootComp: AppComponent, private service: EmpresasService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini';
  }

  ngOnInit() {
    this.service.retornaTodasEmpresas().then(data => {
      this.empresas = data.data;
    });
  }


  novo() {
    this.rota.navigate(['/pages/empresas/novo']);
  }

}
