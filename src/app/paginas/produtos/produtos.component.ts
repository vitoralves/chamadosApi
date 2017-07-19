import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { ProdutosService } from './produtos.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

//varíavel para mostrar o sweetalert
declare var swal: any;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: any;
  pesquisaParam: any;
  produtosPesquisa: any;

  constructor(private rootComp: AppComponent, private service: ProdutosService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    this.buscaTodosProdutos();
  }

  buscaTodosProdutos(){
    this.service.retornaTodosProdutos().then(data => {
      this.produtos = data.data;
      this.produtosPesquisa = this.produtos;
    })
  }

  novo() {
    this.rota.navigate(['/pages/produtos/novo']);
  }

  editar(id: number){
    this.rota.navigate(['pages/produtos/', id]);
  }

  public mostraAlert(): Promise<any>{
    return swal({
      title: 'Você tem certeza?',
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
    this.service.apagarItem(id).then(result => {
      if (result.status === 'success'){
        swal(
          'Apagado!',
          'O item de código '+id+' foi apagado!',
          'success'
        )
        //se necessitar de melhor processamento remover somente do array ao invéz de solicitar na API
        this.buscaTodosProdutos();
      }else{
        swal(
          'Erro!',
          'Ocorreu um erro ao apagar o registro: <b>'+result.message+'</b>',
          'error'
        )
      }
    })
  }

  pesquisar(){
    if (!this.pesquisaParam){
      this.produtos = this.produtosPesquisa;
    }else if (!isNaN(this.pesquisaParam)){
      this.produtos = this.produtosPesquisa;
      this.produtos = this.produtos.filter(item => item.id === +this.pesquisaParam);
    }else{
      this.produtos = this.produtosPesquisa;
      this.produtos = this.produtos.filter(item => item.nome.toUpperCase().indexOf(this.pesquisaParam.toUpperCase()) !== -1);
    }
  }

}
