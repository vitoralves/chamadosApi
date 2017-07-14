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
    id: null,
    produto: null,
    empresa: null,
    estado: null,
    componente: null,
    dt_abertura: null,
    prioridade: null,
    sumario: null,
    descricao: null,
    anexo: null,
    usuario: null
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
    if (this.titulo == 'Sucesso') {
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
    this.ticket.estado = 0;
    this.ticket.usuario = this.usuario.id;
    var data = new Date().toISOString();
    this.ticket.dt_abertura = data.toString();

    //fecha a mensagem para ser exibida novamente
    this.mensagem = false;

    this.service.salvar(this.ticket).then(result => {
      //salvar anexo
      var retorno = result.json();
      console.log(retorno.data[0].id);
      if (retorno.status == 'success') {
        this.ticket.id = retorno.data[0].id;
        this.salvarAnexo();
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

  alteraAnexo(arquivo: any) {
    this.ticket.anexo = <Array<File>>arquivo.target.files;
    console.log(this.ticket.anexo[0]);
  }

  salvarAnexo() {
    this.makeFileRequest("http://localhost:3000/api/ticket/anexo/" + this.ticket.id, [], this.ticket.anexo).then((result) => {
      if (result['status'] === 'success') {
        this.mensagem = true;
        this.texto = 'Novo ticket criado com sucesso!';
        this.titulo = 'Sucesso';
        this.icon = 'fa-check';
        this.alertCss = 'alert-success';
      } else {
        this.mensagem = true;
        this.titulo = 'Alerta';
        this.texto = 'Falha ao inserir anexo!' + result['message'];
        this.alertCss = 'alert-warning';
        this.icon = 'fa-ban';
      }
    }, (error) => {
      this.mensagem = true;
      this.titulo = 'Alerta';
      this.texto = 'Erro ao inserir anexo!' + error;
      this.alertCss = 'alert-warning';
      this.icon = 'fa-ban';

    });
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      formData.append("arquivo", files[0], files[0].name);

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

}
