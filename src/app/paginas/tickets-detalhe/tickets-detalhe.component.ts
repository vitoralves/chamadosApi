import { UtilService } from './../../util/util.service';
import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { TicketsDetalheService } from './tickets-detalhe.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import '../../../tema/js/myjs.js';

// responsavel por chamar o script que fechar o alert
declare var execute: any;

@Component({
  selector: 'app-tickets-detalhe',
  templateUrl: './tickets-detalhe.component.html',
  styleUrls: ['./tickets-detalhe.component.css']
})
export class TicketsDetalheComponent implements OnInit {

  //informacoes de titulo da página
  tituloPagina: string = '';
  breadCrumb: string = '';
  //informações referentes ao alert
  mensagem: boolean = false;
  titulo: string = '';
  icon: string = '';
  texto: string = '';
  alertCss: string = '';

  produto: String;
  componente: String;
  prioridade: String;
  estado: String;
  dt_abertura: String;
  dt_resolvido: String;
  sumario: String;
  descricao: String;

  constructor(private rootComp: AppComponent, private service: TicketsDetalheService, private rotaAtiva: ActivatedRoute, private rota: Router, private util: UtilService) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
    this.rotaAtiva.params.subscribe(params => {
        this.tituloPagina = 'Ticket ' + params.id;
        this.breadCrumb = 'Detalhe';
        this.service.buscarPorId(params.id).then(result => {
          if (result.data.id > 0) {
            this.produto = result.data.produto;
            this.componente = result.data.componente;
            this.prioridade = result.data.prioridade;
            this.estado = result.data.estado;
            this.dt_abertura = result.data.dt_abertura;
            this.dt_resolvido = result.data.dt_resolvido;
            this.sumario = result.data.sumario;
            this.descricao = result.data.descricao;
          } else {
            this.rota.navigate(['pages/nao-encontrado']);
          }
        });
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
          this.rota.navigate(['/pages/tickets']);
        } else {
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar Ticket!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
      })
    } else {
      this.service.adicionar(form.value).then(result => {
        if (result.status === 200) {
          this.mensagem = true;
          this.texto = 'Ticket salvo com sucesso!';
          this.titulo = 'Sucesso';
          this.icon = 'fa-check';
          this.alertCss = 'alert-success';
        } else {
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar Ticket!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
        form.reset();
      })
    }
  }

  retornaPrioridade(p: number){
    return this.util.retornaPrioridade(p);
  }

  retornaEstado(e: number){
    return this.util.retornaEstado(e);
  }

  formataData(d: any){
    if (d == null){
      return '-';
    }
    return this.util.formataData(d);
  }
}
