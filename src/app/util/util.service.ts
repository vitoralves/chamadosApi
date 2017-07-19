import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UtilService {

  constructor(private http: Http) { }

  usuarioLogado() {
    let logado;
    logado = window.sessionStorage.getItem('idusuario');
    if (logado) {
      return true;
    }
    return false;
  }

  logout() {
    window.sessionStorage.clear();
  }

  retornaToken() {
    var data = new Date();
    return ((data.getMonth() + 1) * 100) * data.getDate();
  }


  retornaUsuario() {
    return this.http.get('http://localhost:3000/api/usuario/getUsuarioPorId/' + window.sessionStorage.getItem('idusuario')).map(res => res.json()).toPromise();
  }

  retornaDataFormatada(data) {
    var date = new Date(data);
    var formatada = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
    return formatada;
  }

  formataData(data) {
    if (data == null) {
      return '-';
    }
    return this.retornaDataFormatada(data);
  }

  retornaPrioridade(p: number) {
    switch (p) {
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

  retornaEstado(e: number) {
    switch (e) {
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
  
  retornaBytesAvatar() {
    return 'data:image/png;base64,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';
  }

  usuarioAdmin() {
    let adm = window.sessionStorage.getItem('admin');
    if (adm == 'true'){
      return true;
    }
    return false;
  }

  idUsuario(){
    return window.sessionStorage.getItem('idusuario');
  }

  capitalizarPrimeira(valor){
    //variavel com palavra final
    var final: String = '';
    //quebra a palavra nos espaços
    var split = valor.split(' ');
    //percorre o array formado
    for(var x=0;x<split.length;x++){
      final += split[x].charAt(0).toUpperCase() + split[x].slice(1) +' ';      
    }   
    return final;
  }
}
