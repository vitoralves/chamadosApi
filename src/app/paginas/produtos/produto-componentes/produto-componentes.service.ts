import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

@Injectable()
export class ProdutoComponentesService {

  constructor(private http: Http) { }

  getProdutosComponentesPorProduto(id: number) {
    return this.http.get('http://localhost:3000/api/produtos/componentes/' + id).map(res => res.json()).toPromise();
  }

  getTodosProdutosComponentes(id){
    return this.http.get('http://localhost:3000/api/componentes/produtos/'+id).map(res => res.json()).toPromise();
  }

  salvarComponenteProduto(produtoComponente: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(produtoComponente);
    return this.http.post('http://localhost:3000/api/produtos/componentes/novo/'+jsonData, {headers: headers}).toPromise();
  }

  updateComponenteProduto(produtoComponente:any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(produtoComponente);
    return this.http.put('http://localhost:3000/api/produtos/componentes/update/'+jsonData, {headers: headers}).toPromise();
  }

  deleteProdutoComponente(id: number){
    return this.http.delete('http://localhost:3000/api/produtos/componentes/delete/'+id).map(res => res.json()).toPromise();
  }
}
