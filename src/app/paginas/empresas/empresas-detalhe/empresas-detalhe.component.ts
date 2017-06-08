import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../../app.component';
import { EmpresasDetalheService } from './empresas-detalhe.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas-detalhe',
  templateUrl: './empresas-detalhe.component.html',
  styleUrls: ['./empresas-detalhe.component.css']
})
export class EmpresasDetalheComponent implements OnInit {

  //informacoes de titulo da página
  tituloPagina: string = '';
  breadCrumb: string = '';
  //informações referentes ao alert
  mensagem: boolean = false;
  titulo: string = '';
  icon: string = '';
  texto: string = '';
  alertCss: string = '';

  public celMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public telMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  //entidade que vou trabalhar no form
  empresa: any = {
    id:null,
    nome: null,
    telefone: null,
    celular: null,
    email: null,
    endereco: null
  }


  constructor(private rootComp: AppComponent, private service: EmpresasDetalheService, private rotaAtiva: ActivatedRoute, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
    this.rotaAtiva.params.subscribe(params => {
      if (params.id > 0){
        this.tituloPagina = 'Editar Empresa '+params.id;
        this.breadCrumb = 'Editar';
        this.service.buscarPorId(params.id).then(result => {
          if(result.data.id > 0){
            this.empresa = result.data;
          }else{
            this.rota.navigate(['pages/nao-encontrado']);
          }
        });
      }else{
          this.tituloPagina = 'Inserir nova Empresa';
          this.breadCrumb = 'Novo';
      }
    })
  }

  ngOnInit() {

  }

  salvar(form){
    if (form.value.id > 0){
      this.service.update(form.value).then(result => {
        if (result.status === 200){
          this.rota.navigate(['/pages/empresas']);
        }else{
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar empresa!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
      })
    }else{
      this.service.adicionar(form.value).then(result => {
        if (result.status === 200){
          this.mensagem = true;
          this.texto = 'Empresa salva com sucesso!';
          this.titulo = 'Sucesso';
          this.icon = 'fa-check';
          this.alertCss = 'alert-success';
        }else{
          this.mensagem = true;
          this.texto = 'Ocorreu um erro ao salvar empresa!';
          this.titulo = 'Erro';
          this.icon = 'fa-ban';
          this.alertCss = 'alert-danger';
        }
        form.reset();
      })
    }
  }
}
