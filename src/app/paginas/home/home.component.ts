import { UtilService } from './../../util/util.service';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { HeaderComponent} from '../../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  tickets: any;
  filtro: String = "";
  usuario: any;

  constructor(private rootComp: AppComponent, private rota: Router, private service: HomeService, private util: UtilService) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
      this.service.retornaTodosTickets(this.usuario.empresa).then(res => {
        this.tickets = res.data;
      });
    });
  }

  formataData(data){
    return this.util.retornaDataFormatada(data);
  }

  inserirTicket(){
    this.rota.navigate(['/pages/tickets/novo']);
  }

}
