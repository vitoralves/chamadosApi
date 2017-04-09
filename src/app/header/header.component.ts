import { Component, OnInit } from '@angular/core';

import { HeaderService } from './header.service';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  empresa: string;
  usuario;

  constructor(private service: HeaderService, private util: UtilService) {

  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
      this.service.getEmpresa(this.usuario.empresa).then(data => {
          this.empresa = data.data.nome;
      });
    });
  }

}
