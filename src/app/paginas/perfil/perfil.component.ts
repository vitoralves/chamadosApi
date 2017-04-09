import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { UtilService } from '../../util/util.service';
import { PerfilService } from './perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [PerfilService]
})
export class PerfilComponent implements OnInit {

  usuario = {
    nome: '',
    email: ''
  }
  mensagem: boolean = false;

  constructor(private rootComp: AppComponent, private util: UtilService, private service: PerfilService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini';
  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
    })
  }

  salvar(){
    this.service.salvar(this.usuario).then(data => {
      if (data){
        window.location.reload();
        this.rota.navigate(['/pages/home']);
      }else{
        this.mensagem = true;
      }
    });
  }
}
