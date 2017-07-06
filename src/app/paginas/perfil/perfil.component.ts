import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { UtilService } from '../../util/util.service';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';

import '../../../tema/js/myjs.js';
import { DomSanitizer } from "@angular/platform-browser";

declare var execute;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario = {
    id: '',
    nome: '',
    email: '',
    imagem: null
  }
  mensagem: boolean = false;
  titulo: string = '';
  texto: string = '';
  alertCss: string = '';
  icon: string = '';
  foto: Array<File>;
  fotoBase64: any;
  loading:boolean = true;

  constructor(private rootComp: AppComponent, private util: UtilService, private service: PerfilService, private rota: Router, private sanitizer: DomSanitizer) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
    this.foto = [];
    
  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
      this.usuario.imagem = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64, '+this.usuario.imagem);
    })
  }

  ngAfterViewChecked() {
    if (this.titulo == 'Sucesso') { execute.funcao(); location.reload()}
  }

  salvar() {
    this.service.salvar(this.usuario).then(data => {
      this.mensagem = false;
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
    this.loading = false;
    this.foto = <Array<File>>arquivo.target.files;
    
    //exibir imagem ao alterar
    var file:File = <File>arquivo.target.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.usuario.imagem = myReader.result;
    }
    myReader.readAsDataURL(file);

    this.mensagem = false;

    this.makeFileRequest("http://localhost:3000/api/perfil/imagem/upload/"+this.usuario.id, [], this.foto).then((result) => {
      if (result['status'] === 'success'){
        this.mensagem = true;
        this.titulo = 'Sucesso';
        this.texto = 'Imagem alterada com sucesso!';
        this.alertCss = 'alert-success';
        this.icon = 'fa-check';
        this.loading = true;
      }else{
        this.mensagem = true;
        this.titulo = 'Alerta';
        this.texto = 'Falha ao alterar imagem!'+result['message'];
        this.alertCss = 'alert-warning';
        this.icon = 'fa-ban';
        this.loading = true;
      }
    }, (error) => {
      this.mensagem = true;
        this.titulo = 'Alerta';
        this.texto = 'Falha ao alterar imagem!'+error;
        this.alertCss = 'alert-warning';
        this.icon = 'fa-ban';
        
    });
    this.foto = [];
    arquivo = null;
  }

  base64ToArrayBuffer(base64) {
    var len = base64.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = base64.charCodeAt(i);
    }
    return bytes;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      formData.append("avatar", files[0], files[0].name);

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
