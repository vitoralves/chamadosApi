import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-nao-encontrado',
  templateUrl: './nao-encontrado.component.html',
  styleUrls: ['./nao-encontrado.component.css']
})
export class NaoEncontradoComponent implements OnInit {

  constructor(private rootComp: AppComponent) { 
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini';
  }

  ngOnInit() {
  }

}
