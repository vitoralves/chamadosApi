import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { UsuariosService } from './usuarios.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any;
  pesquisaParam: any;
  usuariosPesquisa: any;

  constructor(private rootComp: AppComponent, private service: UsuariosService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    this.buscaTodasUsuarios();
  }

  buscaTodasUsuarios(){
    this.service.retornaTodosUsuarios().then(data => {
      this.usuarios = data.data;
      this.usuariosPesquisa = this.usuarios;
    })
  }

  novo() {
    this.rota.navigate(['/pages/usuarios/novo']);
  }

  editar(id: number){
    this.rota.navigate(['pages/usuarios/', id]);
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
        this.buscaTodasUsuarios();
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
      this.usuarios = this.usuariosPesquisa;
    }else if (!isNaN(this.pesquisaParam)){
      this.usuarios = this.usuariosPesquisa;
      this.usuarios = this.usuarios.filter(item => item.id === +this.pesquisaParam);
    }else{
      this.usuarios = this.usuariosPesquisa;
      this.usuarios = this.usuarios.filter(item => item.nome.toUpperCase().indexOf(this.pesquisaParam.toUpperCase()) !== -1);
    }
  }

}
