import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class ProdutosService {

  constructor(private http: Http, private util: UtilService) {

  }

  retornaTodosProdutos(){
    return this.http.get('http://localhost:3000/api/produtos/all').map(res => res.json()).toPromise();
  }

  apagarItem(id: number){
    return this.http.delete('http://localhost:3000/api/produto/delete/'+id).map(res => res.json()).toPromise();
  }

  retornaProdutosPorEmpresa(empresa: number){
    return this.http.get('http://localhost:3000/api/produtos/empresa/'+empresa).map(res => res.json()).toPromise();
  }
}
