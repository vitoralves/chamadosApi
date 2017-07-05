import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../../app.component';
import { ComponentesDetalheService } from './componentes-detalhe.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import '../../../../tema/js/myjs.js';

// responsavel por chamar o script que fechar o alert
declare var execute: any;

@Component({
  selector: 'app-componentes-detalhe',
  templateUrl: './componentes-detalhe.component.html',
  styleUrls: ['./componentes-detalhe.component.css']
})
export class ComponentesDetalheComponent implements OnInit {

  //informacoes de titulo da página
  tituloPagina: string = '';
  breadCrumb: string = '';
  //informações referentes ao alert
  mensagem: boolean = false;
  titulo: string = '';
  icon: string = '';
  texto: string = '';
  alertCss: string = '';

  //entidade para trabalhar no form
  componente: any = {
    id: null,
    nome: null
  }


  constructor(private rootComp: AppComponent, private service: ComponentesDetalheService, private rotaAtiva: ActivatedRoute, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
    this.rotaAtiva.params.subscribe(params => {
      if (params.id > 0) {
        this.tituloPagina = 'Editar Componente ' + params.id;
        this.breadCrumb = 'Editar';
        this.service.buscarPorId(params.id).then(result => {
          if (result.data.id > 0) {
            this.componente = result.data;
          } else {
            this.rota.navigate(['pages/nao-encontrado']);
          }
        });
      } else {
        this.tituloPagina = 'Inserir novo Componente';
        this.breadCrumb = 'Novo';
      }
    })
  }

  ngOnInit() {

  }

  // chamado toda vez que uma checagem do componente é feita
  ngAfterViewChecked() {
    // fecha alert automatico
    if (this.titulo == 'Sucesso'){       execute.funcao();     }   
  }

  salvar(form) {
    //fecha a mensagem para ser exibida novamente
    this.mensagem = false;
    if (form.value.id > 0) {
      this.service.update(form.value).then(result => {
        if (result.status === 200) {
          this.rota.navigate(['/pages/componentes']);
        } else {
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar Componente!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
      })
    } else {
      this.service.adicionar(form.value).then(result => {
        if (result.status === 200) {
          this.mensagem = true;
          this.texto = 'Componente salvo com sucesso!';
          this.titulo = 'Sucesso';
          this.icon = 'fa-check';
          this.alertCss = 'alert-success';
        } else {
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar Componente!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
        form.reset();
      })
    }
  }
}
