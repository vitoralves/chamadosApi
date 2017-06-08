import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'body', //selector desse cara é o component body
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //alterar o css do body na tela de login e nas demais, para o correto funcionamento do template
  //this.rootComp.cssClass = 'hold-transition login-page'; => construção do login
  // this.rootComp.cssClass = 'hold-transition skin-blue sidebar-mini sidebar-collapse'; => construção do resto dos components
  @HostBinding('class') public cssClass = '';

  constructor(){
  }

}
