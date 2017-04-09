import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UtilService } from '../../util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  email;
  senha;
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
      this.service.logar(this.email,this.senha).then(data => {
          if(data.data[0] && data.data[0].id){
            let id = data.data[0].id;
            window.sessionStorage.setItem('idusuario', id);
            this.rota.navigate(['/pages/home']);
          }else{
            this.alerta = true;
            this.senha = '';
            this.mensagem = 'Usuário não encontrado!';
          }
      }).catch((e) => {
        console.log("erro "+e);
        this.alerta = true;
        this.mensagem = 'Erro ao estabelecer comunicação com servidor.';
      })
  }
}
