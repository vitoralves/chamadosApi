import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../../app.component';
import { ProdutosDetalheService } from './produtos-detalhe.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import '../../../../tema/js/myjs.js';

// responsavel por chamar o script que fechar o alert
declare var execute: any;

@Component({
  selector: 'app-produtos-detalhe',
  templateUrl: './produtos-detalhe.component.html',
  styleUrls: ['./produtos-detalhe.component.css']
})
export class ProdutosDetalheComponent implements OnInit {

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
  produto: any = {
    id: null,
    nome: null,
    ativo: true
  }


  constructor(private rootComp: AppComponent, private service: ProdutosDetalheService, private rotaAtiva: ActivatedRoute, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini';
    this.rotaAtiva.params.subscribe(params => {
      if (params.id > 0) {
        this.tituloPagina = 'Editar Produto ' + params.id;
        this.breadCrumb = 'Editar';
        this.service.buscarPorId(params.id).then(result => {
          if (result.data.id > 0) {
            this.produto = result.data;
          } else {
            this.rota.navigate(['pages/nao-encontrado']);
          }
        });
      } else {
        this.tituloPagina = 'Inserir novo Produto';
        this.breadCrumb = 'Novo';
      }
    })
  }

  ngOnInit() {

  }

  // chamado toda vez que uma checagem do componente é feita
  ngAfterViewChecked() {
    // fecha alert automatico
    execute.funcao();
  }

  salvar(form) {
    if (form.value.id > 0) {
      this.service.update(form.value).then(result => {
        if (result.status === 200) {
          this.rota.navigate(['/pages/produtos']);
        } else {
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar Produto!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
      })
    } else {
      this.service.adicionar(form.value).then(result => {
        if (result.status === 200) {
          this.mensagem = true;
          this.texto = 'Produto salvo com sucesso!';
          this.titulo = 'Sucesso';
          this.icon = 'fa-check';
          this.alertCss = 'alert-success';
        } else {
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar Produto!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
        form.reset();
      })
    }
  }
}
