import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { EmpresasService } from './empresas.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

declare var swal: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: any;
  pesquisaParam: any;
  empresasPesquisa: any;

  constructor(private rootComp: AppComponent, private service: EmpresasService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    this.buscaTodasEmpresas();
  }

  buscaTodasEmpresas(){
    this.service.retornaTodasEmpresas().then(data => {
      this.empresas = data.data;
      this.empresasPesquisa = this.empresas;
    })
  }

  novo() {
    this.rota.navigate(['/pages/empresas/novo']);
  }

  editar(id: number){
    this.rota.navigate(['pages/empresas/', id]);
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
        this.buscaTodasEmpresas();
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
      this.empresas = this.empresasPesquisa;
    }else if (!isNaN(this.pesquisaParam)){
      this.empresas = this.empresasPesquisa;
      this.empresas = this.empresas.filter(item => item.id === +this.pesquisaParam);
    }else{
      this.empresas = this.empresasPesquisa;
      this.empresas = this.empresas.filter(item => item.nome.toUpperCase().indexOf(this.pesquisaParam.toUpperCase()) !== -1);
    }
  }

}
