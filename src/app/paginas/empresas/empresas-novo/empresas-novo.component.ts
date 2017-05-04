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
  mensagem: boolean = false;
  titulo: string = '';
  icon: string = '';
  texto: string = '';
  alertCss: string = '';

  //entidade que vou trabalhar no form
  empresa: any = {
    nome: null,
    telefone: null,
    email: null,
    endereco: null
  }


  constructor(private rootComp: AppComponent, private service: EmpresasNovoService) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini';
  }

  ngOnInit() {
    this.inicializaEntidade();
  }

  inicializaEntidade(){
    this.empresa.nome = null;
    this.empresa.telefone = null;
    this.empresa.email = null;
    this.empresa.endereco = null;
  }

  salvar(form){
    this.service.adicionar(form.value).then(result => {
      if (result.status === 200){
        this.mensagem = true;
        this.texto = 'Empresa salva com sucesso!';
        this.titulo = 'Sucesso';
        this.icon = 'fa-check';
        this.alertCss = 'alert-success';
      }else{
        this.mensagem = true;
        this.texto = 'Ocorreu um erro ao salvar empresa!';
        this.titulo = 'Erro';
        this.icon = 'fa-ban';
        this.alertCss = 'alert-danger';
      }
      form.reset();
    })
  }
}
