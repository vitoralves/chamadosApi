import { ComponentesService } from './../componentes/componentes.service';
import { ProdutosService } from './../produtos/produtos.service';
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

  ticket = {
    produto: null,
    empresa: null,
    componente: null,
    dt_abertura: null,
    prioridade: null,
    sumario: null,
    descricao: null
  }

  produtos: any;
  usuario: any;
  componentes: any;

  constructor(private rootComp: AppComponent, private util: UtilService, private service: TicketsService, private rota: Router,
    private prodService: ProdutosService, private compService: ComponentesService) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
      this.prodService.retornaProdutosPorEmpresa(this.usuario.empresa).then(res => {
        this.produtos = res.data;
      });
    });

  }

  ngAfterViewChecked() {
    if (this.titulo == 'Sucesso'){
      execute.funcao();
    }    
  }

  selecionaProduto() {
    this.compService.retornaComponentesPorProduto(this.ticket.produto).then(res => {
      this.componentes = res.data;
    });
  }

  salvar(form) {
    this.ticket.empresa = this.usuario.empresa;
    var data = new Date().toISOString();
    this.ticket.dt_abertura = data.toString();
    
    //fecha a mensagem para ser exibida novamente
    this.mensagem = false;

    this.service.salvar(this.ticket).then(result => {
      var retorno = result.json();
      console.log(retorno);
      if (retorno.status == 'success') {
        this.mensagem = true;
        this.texto = 'Ticket salvo com sucesso!';
        this.titulo = 'Sucesso';
        this.icon = 'fa-check';
        this.alertCss = 'alert-success';
      } else {
        this.mensagem = true;
        this.texto = 'Ocorreu um erro ao salvar Ticket! ' + retorno.message;
        this.titulo = 'Erro';
        this.icon = 'fa-ban';
        this.alertCss = 'alert-danger';
      }
      form.reset();
    })
  }

}
