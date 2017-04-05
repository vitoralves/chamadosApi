import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() {  }

  usuarioLogado(){
    let logado;
    logado = window.sessionStorage.getItem('usuario');
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

}
