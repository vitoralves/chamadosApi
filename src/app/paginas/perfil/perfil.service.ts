import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

import { Http } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class PerfilService {

  constructor(private http: Http, private util: UtilService) { }

  salvar(usuario) {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.put('http://localhost:3000/api/perfil/salvar/' + JSON.stringify(usuario) + '/' + this.util.retornaToken(), { headers: headers }).subscribe(status => {
        if (status.status == 200) {
          resolve(true);
        } else
          resolve(false);
      });
    });
  }

  salvarImagem(dado) {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.put('http://localhost:3000/api/perfil/salvar/imagem' + JSON.stringify(dado) + '/' + this.util.retornaToken(), { headers: headers }).subscribe(status => {
        if (status.status == 200) {
          resolve(true);
        } else
          resolve(false);
      });
    });
  }
}
