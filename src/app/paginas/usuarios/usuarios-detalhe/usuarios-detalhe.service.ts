import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { md5 } from './../../../util/md5';

@Injectable()
export class UsuariosDetalheService {

  constructor(private http: Http) {  }

  adicionar(dados: any){
    //setar senha padrao
    dados.senha = md5('123456');

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(dados);
    return this.http.post('http://localhost:3000/api/usuarios/novo/'+jsonData, {headers: headers}).toPromise();
  }

  buscarPorId(id: number){
    return this.http.get('http://localhost:3000/api/usuario/getUsuarioPorId/'+id).map(res => res.json()).toPromise();
  }

  update(dados: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(dados);
    return this.http.put('http://localhost:3000/api/usuario/update/'+jsonData, {headers: headers}).toPromise();
  }

  alterarSenha(senha,usuario){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/usuario/senha/'+usuario+'/'+md5(senha), {headers: headers}).toPromise();
  }
}
