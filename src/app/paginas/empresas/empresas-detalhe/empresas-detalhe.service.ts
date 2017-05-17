import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

@Injectable()
export class EmpresasDetalheService {

  constructor(private http: Http) {  }

  adicionar(dados: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(dados);
    return this.http.post('http://localhost:3000/api/empresas/novo/'+jsonData, {headers: headers}).toPromise();
  }

  buscarPorId(id: number){
    return this.http.get('http://localhost:3000/api/empresa/'+id).map(res => res.json()).toPromise();
  }

  update(dados: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(dados);
    return this.http.put('http://localhost:3000/api/empresa/update/'+jsonData, {headers: headers}).toPromise();
  }
}
