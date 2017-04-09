import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UtilService {

  constructor(private http: Http) {  }

  usuarioLogado(){
    let logado;
    logado = window.sessionStorage.getItem('idusuario');
    if(logado){
      return true;
    }
    return false;
  }

  logout(){
    window.sessionStorage.clear();
  }

  retornaToken(){
    var data = new Date();
    return ((data.getMonth() + 1) * 100) * data.getDate();
  }


  retornaUsuario(){
    return this.http.get('http://localhost:3000/api/usuario/getUsuarioPorId/'+window.sessionStorage.getItem('idusuario')+'/'+this.retornaToken()).map(res => res.json()).toPromise();
  }

}
