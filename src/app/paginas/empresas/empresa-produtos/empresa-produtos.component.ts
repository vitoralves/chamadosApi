import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { EmpresaProdutosService } from './empresa-produtos.service';
import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'app-empresa-produtos',
  templateUrl: './empresa-produtos.component.html',
  styleUrls: ['./empresa-produtos.component.css']
})
export class EmpresaProdutosComponent implements OnInit {

  private listProdutosPorEmpresa: any;
  private listProdutos: any;
  private empresa: number;
  private alterar: boolean = false;
  empresaProduto: any = {
    id: 0,
    produto: 0,
    ativo: false,
    empresa: 0
  }
  //informações referentes ao alert
  mensagem: boolean = false;
  titulo: string = '';
  icon: string = '';
  texto: string = '';
  alertCss: string = '';

  constructor(private service: EmpresaProdutosService, private rotaAtiva: ActivatedRoute) {
    this.rotaAtiva.params.subscribe(params => {
      this.empresa = params.id;
    });
  }

  ngOnInit() {
    this.getListProdutosPorEmpresa();
    this.getTodosEmpresasProdutos();
  }

  private getListProdutosPorEmpresa() {
    this.service.getEmpresasProdutosPorEmpresa(this.empresa).then(data => {
      this.listProdutosPorEmpresa = data.data;
    });
  }

  private getTodosEmpresasProdutos() {
    this.service.getTodosEmpresasProdutos().then(data => {
      this.listProdutos = data.data;
    });
  }

  private alterarProduto() {
    this.alterar = true;
  }

  private salvarProduto() {
    this.empresaProduto.empresa = this.empresa;

    this.service.salvarProdutoEmpresa(this.empresaProduto).then(data => {
      this.mensagem = true;
      this.texto = 'Novo produto disponível para empresa.';
      this.titulo = 'Sucesso';
      this.icon = 'fa-check';
      this.alertCss = 'alert-success';
      this.alterar = false;
      this.getListProdutosPorEmpresa();
    }).catch((e) => {
      this.alterar = false;
      this.mensagem = true;
      this.texto = 'Ocorreu um erro ao salvar produto! ' + e;
      this.titulo = 'Erro';
      this.icon = 'fa-ban';
      this.alertCss = 'alert-danger';
    })
  }

  cancelarSalvar() {
    this.alterar = false;
  }
  
  editarLinha(entidade: any){
    this.empresaProduto.id = entidade.id;
    this.empresaProduto.produto = entidade.produto;
    this.empresaProduto.empresa = entidade.empresa;
    this.empresaProduto.ativo = entidade.ativo;

    this.alterar = true;
  }

  salvarEdicao(){
    this.service.updateProdutoEmpresa(this.empresaProduto).then(data => {
      this.mensagem = true;
      this.texto = 'Produto alterado com sucesso!';
      this.titulo = 'Sucesso';
      this.icon = 'fa-check';
      this.alertCss = 'alert-success';
      this.alterar = false;
      this.getListProdutosPorEmpresa();
    }).catch((e) => {
      this.alterar = false;
      this.mensagem = true;
      this.texto = 'Ocorreu um erro ao salvar produto! ' + e;
      this.titulo = 'Erro';
      this.icon = 'fa-ban';
      this.alertCss = 'alert-danger';
    })
  }

  public mostraAlert(): Promise<any>{
    return swal({
      title: 'Apagar produto?',
      text: "Essa ação não poderá ser desfeita!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then(function() {
      return true;
    }, function (dismiss) {
      return false;
    })
  }

  public deletar(id: number){
    this.mostraAlert().then(retorno => {
      if (retorno) {
        this.apagarItem(id);
      }
    })
  }

  public apagarItem(id: number){
    this.service.deleteEmpresaProduto(id).then(result => {
      if (result.status === 'success'){
        swal(
          'Apagado!',
          'O item de código '+id+' foi apagado!',
          'success'
        )
        //se necessitar de melhor processamento remover somente do array ao invéz de solicitar na API
        this.getListProdutosPorEmpresa();
      }else{
        swal(
          'Erro!',
          'Ocorreu um erro ao apagar o registro: <b>'+result.message+'</b>',
          'error'
        )
      }
    })
  }
}
