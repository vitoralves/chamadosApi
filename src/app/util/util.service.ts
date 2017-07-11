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
    return this.http.get('http://localhost:3000/api/usuario/getUsuarioPorId/'+window.sessionStorage.getItem('idusuario')).map(res => res.json()).toPromise();
  }

  retornaDataFormatada(data){
    var date = new Date(data);
    var formatada = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
    return formatada;
  }

  formataData(data){
    if (data == null){
      return '-';
    }
    return this.retornaDataFormatada(data);
  }
  
  retornaPrioridade(p: number){
    switch(p){
      case 0: {
        return 'Baixa';
      }
      case 1: {
        return 'Média';
      }
      case 2: {
        return 'Alta';
      }
      case 3: {
        return 'Muito Alta';
      }
      default: {
        return 'Não identificado';
      }
    }
  }

  retornaEstado(e: number){
    switch(e){
      case 0: {
        return 'Aberto';
      }
      case 1: {
        return 'Em andamento';
      }
      case 2: {
        return 'Resolvido';
      }
    }
  }

}
