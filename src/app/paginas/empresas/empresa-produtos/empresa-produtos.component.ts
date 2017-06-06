import { ActivatedRoute } from '@angular/router';
import { EmpresaProdutosService } from './empresa-produtos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa-produtos',
  templateUrl: './empresa-produtos.component.html',
  styleUrls: ['./empresa-produtos.component.css']
})
export class EmpresaProdutosComponent implements OnInit {

  private listProdutosPorEmpresa: any;
  private listProdutos: any;
  private empresa: number;
  private adicionar: boolean = false;
  empresaProduto: any = {
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

  private adicionarProduto() {
    this.adicionar = true;
  }

  private salvarProduto() {
    this.empresaProduto.empresa = this.empresa;

    this.service.salvarProdutoEmpresa(this.empresaProduto).then(data => {
      this.mensagem = true;
      this.texto = 'Novo produto disponível para empresa.';
      this.titulo = 'Sucesso';
      this.icon = 'fa-check';
      this.alertCss = 'alert-success';
      this.adicionar = false;
      this.getListProdutosPorEmpresa();
    }).catch((e) => {
      this.adicionar = false;
      this.mensagem = true;
      this.texto = 'Ocorreu um erro ao salvar produto! ' + e;
      this.titulo = 'Erro';
      this.icon = 'fa-ban';
      this.alertCss = 'alert-danger';
    })
  }

  cancelarSalvar(){
    this.adicionar = false;
  }

}
