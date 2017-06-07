import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

@Injectable()
export class EmpresaProdutosService {

  constructor(private http: Http) { }

  getEmpresasProdutosPorEmpresa(id: number) {
    return this.http.get('http://localhost:3000/api/empresas/produtos/' + id).map(res => res.json()).toPromise();
  }

  getTodosEmpresasProdutos(){
    return this.http.get('http://localhost:3000/api/produtos/all').map(res => res.json()).toPromise();
  }

  salvarProdutoEmpresa(empresaProduto: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(empresaProduto);
    return this.http.post('http://localhost:3000/api/empresas/produtos/novo/'+jsonData, {headers: headers}).toPromise();
  }

  updateProdutoEmpresa(empresaProduto:any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(empresaProduto);
    return this.http.put('http://localhost:3000/api/empresas/produtos/update/'+jsonData, {headers: headers}).toPromise();
  }

  deleteEmpresaProduto(id: number){
    return this.http.delete('http://localhost:3000/api/empresas/produtos/delete/'+id).map(res => res.json()).toPromise();
  }
}
