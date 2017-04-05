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
  logado: boolean = false;

  constructor(private service: HeaderService, private util: UtilService) {

  }

  ngOnInit() {
    this.logado = this.util.usuarioLogado();
    
  }

}
