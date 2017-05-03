import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

@Injectable()
export class EmpresasNovoService {

  constructor(private http: Http) {  }

  adicionar(dados: any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(dados);
    return this.http.post('http://localhost:3000/api/empresas/novo/'+jsonData, {headers: headers}).toPromise();
  }
}
