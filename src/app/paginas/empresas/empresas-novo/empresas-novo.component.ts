import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../../app.component';
import { EmpresasNovoService } from './empresas-novo.service';

@Component({
  selector: 'app-empresas-novo',
  templateUrl: './empresas-novo.component.html',
  styleUrls: ['./empresas-novo.component.css']
})
export class EmpresasNovoComponent implements OnInit {

  //informações referentes ao alert
  mensagem: string = '';
  titulo: string = '';
  icon: string = '';
  text: string = '';
  alertCss: string = '';


  constructor(private rootComp: AppComponent, private service: EmpresasNovoService) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini';
  }

  ngOnInit() {
  }

  salvar(form){
    console.log(form);
    /*this.service.adicionar(form.values).then(result => {
      console.log(result);
    })*/
  }
}
