import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../../app.component';
import { UsuariosDetalheService } from './usuarios-detalhe.service';
import { EmpresasService } from './../../empresas/empresas.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import '../../../../tema/js/myjs.js';
declare var execute: any;

//varíavel para mostrar o sweetalert
declare var swal: any;

@Component({
  selector: 'app-usuarios-detalhe',
  templateUrl: './usuarios-detalhe.component.html',
  styleUrls: ['./usuarios-detalhe.component.css']
})
export class UsuariosDetalheComponent implements OnInit {

  //informacoes de titulo da página
  tituloPagina: string = '';
  breadCrumb: string = '';
  //informações referentes ao alert
  mensagem: boolean = false;
  titulo: string = '';
  icon: string = '';
  texto: string = '';
  alertCss: string = '';

  //lista de empresas
  empresas: any;

  //alterar senhas
  novaSenha;
  confirmaSenha;

  //entidade que vou trabalhar no form
  usuario: any = {
    id: null,
    nome: null,
    email: null,
    adm: null,
    empresa: null,
    senha: null
  }


  constructor(private rootComp: AppComponent, private service: UsuariosDetalheService, private rotaAtiva: ActivatedRoute,
    private rota: Router, private empresasService: EmpresasService) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
    this.rotaAtiva.params.subscribe(params => {
      if (params.id > 0) {
        this.tituloPagina = 'Editar Usuário ' + params.id;
        this.breadCrumb = 'Editar';
        this.service.buscarPorId(params.id).then(result => {
          if (result.data.id > 0) {
            this.usuario = result.data;
          } else {
            this.rota.navigate(['pages/nao-encontrado']);
          }
        });
      } else {
        this.tituloPagina = 'Inserir novo Usuário';
        this.breadCrumb = 'Novo';
      }
    })
    //carregar empresas para selecionar
    this.empresasService.retornaTodasEmpresas().then(result => {
      this.empresas = result.data;
    })
  }

  ngOnInit() {

  }

  salvar(form) {
    //fecha a mensagem para ser exibida novamente
    this.mensagem = false;
    if (form.value.id > 0) {
      this.service.update(form.value).then(result => {
        if (result.status === 200) {
          this.rota.navigate(['/pages/usuarios']);
        } else {
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar usuario!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
      })
    } else {
      this.service.adicionar(form.value).then(result => {
        if (result.status === 200) {
          this.mensagem = true;
          this.texto = 'Usuário salvo com sucesso!';
          this.titulo = 'Sucesso';
          this.icon = 'fa-check';
          this.alertCss = 'alert-success';
          form.reset();
          //fecha o balão de mensagem depois de 5 segundos
          setTimeout(function () { execute.funcao() }, 5000);
        } else {
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar usuario! ' + result;
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
      })
    }
  }

  alterarSenha() {
    if (this.novaSenha == this.confirmaSenha) {
      //resgata id do usuario
      var usuario;
      this.rotaAtiva.params.subscribe(params => {
        usuario = params.id;
      })
      this.service.alterarSenha(this.novaSenha,usuario).then(result => {
        if (result.status === 200) {
          this.mensagem = true;
          this.texto = 'Senha alterada com sucesso!';
          this.titulo = 'Sucesso';
          this.icon = 'fa-check';
          this.alertCss = 'alert-success';
          setTimeout(function () { execute.funcao() }, 5000);
        }
      }).catch((e) => {
        let objeto = JSON.parse(e._body);
        this.mensagem = true;
        this.texto = 'Erro: ' + objeto.message;
        this.titulo = 'Erro';
        this.icon = 'fa-ban';
        this.alertCss = 'alert-danger';
        //fecha o balão de mensagem depois de 5 segundos
        setTimeout(function () { execute.funcao() }, 5000);
      })
    } else {
      this.mensagem = true;
      this.texto = 'Senhas não conferem!';
      this.titulo = 'Erro';
      this.icon = 'fa-ban';
      this.alertCss = 'alert-danger';
      //fecha o balão de mensagem depois de 5 segundos
      setTimeout(function () { execute.funcao() }, 5000);
    }
  }
}
