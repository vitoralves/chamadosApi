import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

@Injectable()
export class ProdutosDetalheService {

  constructor(private http: Http) {  }

  adicionar(dados: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(dados);
    return this.http.post('http://localhost:3000/api/produtos/novo/'+jsonData, {headers: headers}).toPromise();
  }

  buscarPorId(id: number){
    return this.http.get('http://localhost:3000/api/Produto/'+id).map(res => res.json()).toPromise();
  }

  update(dados: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(dados);
    return this.http.put('http://localhost:3000/api/Produto/update/'+jsonData, {headers: headers}).toPromise();
  }
}
