import { Component, OnInit, HostBinding } from '@angular/core';

import { UtilService } from './util/util.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  //alterar o css do body na tela de login e nas demais, para o correto funcionamento do template
  //this.rootComp.cssClass = 'hold-transition login-page'; => construção do login
  // this.rootComp.cssClass = 'hold-transition skin-blue sidebar-mini'; => construção do resto dos components
  @HostBinding('class') public cssClass = '';
  backLogin: string;


  constructor(private util: UtilService){

  }

  ngOnInit(){

  }
}
