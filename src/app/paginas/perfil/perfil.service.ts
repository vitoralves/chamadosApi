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

      usuario.imagem = this.base64ToArrayBuffer(usuario.imagem);

      console.log(usuario.imagem);

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

     this.http.put('http://localhost:3000/api/perfil/salvar/imagem/' + dado, { headers: headers }).subscribe(status => {
       if (status.status == 200) {
         resolve(true);
       } else
         resolve(false);
     });
   });
  }

  base64ToArrayBuffer(base64) {
    var binary_string = window.atob(btoa(base64));
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
