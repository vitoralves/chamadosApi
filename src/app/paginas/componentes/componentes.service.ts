import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

import { Http } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class ComponentesService {

  constructor(private http: Http, private util: UtilService) { }
  
  retornaTodosComponentes(){
    return this.http.get('http://localhost:3000/api/componentes/all').map(res => res.json()).toPromise();
  }

  apagarItem(id: number){
    return this.http.delete('http://localhost:3000/api/componente/delete/'+id).map(res => res.json()).toPromise();
  }

  retornaComponentesPorProduto(produto){
    return this.http.get('http://localhost:3000/api/componentes/produtos/'+produto).map(res => res.json()).toPromise();
  }
}
