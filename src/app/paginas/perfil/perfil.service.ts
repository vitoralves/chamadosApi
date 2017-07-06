import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
var LZString = require('../../util/lz-string');

import { Http } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class PerfilService {

  constructor(private http: Http, private util: UtilService) { }

  salvar(usuario) {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      usuario.imagem = '';

      this.http.put('http://localhost:3000/api/perfil/salvar/' + JSON.stringify(usuario) + '/' + this.util.retornaToken(), { headers: headers }).subscribe(status => {
        if (status.status == 200) {
          resolve(true);
        } else
          resolve(false);
      });
    });
  }
  
}
