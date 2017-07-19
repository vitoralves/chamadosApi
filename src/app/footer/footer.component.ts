import { Component, OnInit } from '@angular/core';

import { UtilService } from '../util/util.service';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  logado: boolean = false;

  constructor(private util: UtilService) { }

  ngOnInit() {
    this.logado = this.util.usuarioLogado();
  }

}
