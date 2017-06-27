import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { UtilService } from '../../util/util.service';
import { TicketsService } from './tickets.service';
import { Router } from '@angular/router';

import '../../../tema/js/myjs.js';

declare var execute;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  mensagem: boolean = false;
  titulo: string = '';
  texto: string = '';
  alertCss: string = '';
  icon: string = '';

  constructor(private rootComp: AppComponent, private util: UtilService, private service: TicketsService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    
  }

  ngAfterViewChecked() {
    execute.funcao();
  }

  salvar() {
    
  }
}
