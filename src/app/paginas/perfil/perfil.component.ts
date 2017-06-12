import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { UtilService } from '../../util/util.service';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';

import '../../../tema/js/myjs.js';

declare var execute;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario = {
    nome: '',
    email: '',
    imagem: ''
  }
  mensagem: boolean = false;
  titulo: string = '';
  texto: string = '';
  alertCss: string = '';
  icon: string = '';
  foto: Array<File>;
  fotoBase64: any;

  constructor(private rootComp: AppComponent, private util: UtilService, private service: PerfilService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
    this.foto = [];
  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
    })
  }

  ngAfterViewChecked() {
    execute.funcao();
  }

  salvar() {
    this.service.salvar(this.usuario).then(data => {
      if (data) {
        this.mensagem = true;
        this.titulo = 'Sucesso';
        this.texto = 'Alterações salvas com sucesso!';
        this.alertCss = 'alert-success';
        this.icon = 'fa-check';
      } else {
        this.mensagem = true;
        this.titulo = 'Alerta';
        this.texto = 'Falha ao salvar registro!';
        this.alertCss = 'alert-warning';
        this.icon = 'fa-ban';
      }
    });
  }

  alteraFoto(arquivo: any) {
    this.foto = <Array<File>>arquivo.target.files;
    let base64Image: string;

    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      base64Image = myReader.result;
      this.fotoBase64 = base64Image;
      this.usuario.imagem = this.fotoBase64;
    }
    myReader.readAsDataURL(this.foto[0]);
  }

}
