import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { ProdutoComponentesService } from './produto-componentes.service';
import { Component, OnInit } from '@angular/core';

import '../../../../tema/js/myjs.js';

declare var swal: any;
declare var execute: any;

@Component({
  selector: 'app-produto-componentes',
  templateUrl: './produto-componentes.component.html',
  styleUrls: ['./produto-componentes.component.css']
})
export class ProdutoComponentesComponent implements OnInit {

  private listComponentesPorProduto: any;
  private listComponentes: any;
  private produto: number;
  private alterar: boolean = false;
  produtoComponente: any = {
    id: 0,
    componente: 0,
    produto: 0
  }
  //informações referentes ao alert
  mensagem: boolean = false;
  titulo: string = '';
  icon: string = '';
  texto: string = '';
  alertCss: string = '';

  constructor(private service: ProdutoComponentesService, private rotaAtiva: ActivatedRoute) {
    this.rotaAtiva.params.subscribe(params => {
      this.produto = params.id;
    });
  }

  ngOnInit() {
    this.getListComponentesPorProduto();
    this.getTodosProdutosComponentes();
  }

  private getListComponentesPorProduto() {
    this.service.getProdutosComponentesPorProduto(this.produto).then(data => {
      this.listComponentesPorProduto = data.data;
      if (this.titulo == 'Sucesso'){       execute.funcao();     }   
    });
  }

  private getTodosProdutosComponentes() {
    this.service.getTodosProdutosComponentes(this.produto).then(data => {
      this.listComponentes = data.data;
    });
  }

  private alterarComponente() {
    this.alterar = true;
  }

  private salvarComponente() {
    this.produtoComponente.produto = this.produto;
    //reseta para mostrá-lo novamente
    this.mensagem = false;
    this.service.salvarComponenteProduto(this.produtoComponente).then(data => {
      this.mensagem = true;
      this.texto = 'Novo componente disponível para produto.';
      this.titulo = 'Sucesso';
      this.icon = 'fa-check';
      this.alertCss = 'alert-success';
      this.alterar = false;
      this.getListComponentesPorProduto();
      this.getTodosProdutosComponentes();
    }).catch((e) => {
      this.alterar = false;
      this.mensagem = true;
      this.texto = 'Ocorreu um erro ao salvar componente! ' + e;
      this.titulo = 'Erro';
      this.icon = 'fa-ban';
      this.alertCss = 'alert-danger';
    })
  }

  cancelarSalvar() {
    this.alterar = false;
  }

  editarLinha(entidade: any) {
    this.produtoComponente.id = entidade.id;
    this.produtoComponente.componente = entidade.componente;
    this.produtoComponente.produto = entidade.produto;
    this.produtoComponente.ativo = entidade.ativo;

    this.alterar = true;
  }

  salvarEdicao() {
    this.service.updateComponenteProduto(this.produtoComponente).then(data => {
      this.mensagem = true;
      this.texto = 'Componente alterado com sucesso!';
      this.titulo = 'Sucesso';
      this.icon = 'fa-check';
      this.alertCss = 'alert-success';
      this.alterar = false;
      this.getListComponentesPorProduto();
    }).catch((e) => {
      this.alterar = false;
      this.mensagem = true;
      this.texto = 'Ocorreu um erro ao salvar componente! ' + e;
      this.titulo = 'Erro';
      this.icon = 'fa-ban';
      this.alertCss = 'alert-danger';
    })
  }

  public mostraAlert(): Promise<any> {
    return swal({
      title: 'Apagar componente?',
      text: "Essa ação não poderá ser desfeita!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then(function () {
      return true;
    }, function (dismiss) {
      return false;
    })
  }

  public deletar(id: number) {
    this.mostraAlert().then(retorno => {
      if (retorno) {
        this.apagarItem(id);
      }
    })
  }

  public apagarItem(id: number) {
    this.service.deleteProdutoComponente(id).then(result => {
      if (result.status === 'success') {
        swal(
          'Apagado!',
          'O item de código ' + id + ' foi apagado!',
          'success'
        )
        //se necessitar de melhor processamento remover somente do array ao invéz de solicitar na API
        this.getListComponentesPorProduto();
      } else {
        swal(
          'Erro!',
          'Ocorreu um erro ao apagar o registro: <b>' + result.message + '</b>',
          'error'
        )
      }
    })
  }
}
