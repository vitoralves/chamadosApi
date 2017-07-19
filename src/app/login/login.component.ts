import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../app.component';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {
    email: null,
    senha: null
  }

  alerta: boolean = false;
  mensagem: string = '';

  constructor(private rootComp: AppComponent, private service: LoginService, private rota: Router, private util: UtilService) {
    this.rootComp.cssClass = 'hold-transition login-page';
  }

  ngOnInit() {
    if (this.util.usuarioLogado()){
      this.rota.navigate(['/pages/home']);
    }
  }

  logar(){
    this.alerta = false;
    this.service.logar(this.usuario.email,this.usuario.senha).then(data => {
      if(data.data[0] && data.data[0].id){
        let id = data.data[0].id;
        let adm = data.data[0].adm;
        console.log('adm '+adm);
        window.sessionStorage.setItem('idusuario', id);
        window.sessionStorage.setItem('admin', adm);
        this.rota.navigate(['/pages/home']);
      }else{
        this.alerta = true;
        this.usuario.senha = '';
        this.mensagem = 'Usuário não encontrado!';
      }
    }).catch((e) => {
      console.log(e);
      this.alerta = true;
      let objeto = JSON.parse(e._body);
      console.log(objeto);
      this.mensagem = objeto.message;
    })
  }
}
