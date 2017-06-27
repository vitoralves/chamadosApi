import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
var LZString = require('../../util/lz-string');

import { Http } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class TicketsService {

  constructor(private http: Http, private util: UtilService) { }

  salvar(usuario) {
    return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      usuario.imagem = this.base64ToArrayBuffer(usuario.imagem);

      this.http.put('http://localhost:3000/api/tickets/salvar/' + JSON.stringify(usuario) + '/' + this.util.retornaToken(), { headers: headers }).subscribe(status => {
        if (status.status == 200) {
          resolve(true);
        } else
          resolve(false);
      });
    });
  }

  salvarImagem(dado) {
    console.log(dado.length);
    var compressed = LZString.compressToEncodedURIComponent(dado);
    console.log(compressed.length);
   /* return new Promise(resolve => {
      var headers = new Headers();
      headers.append('Content-Type', undefined);

      var form = new FormData();
      form.append("img", dado);

      this.http.put('http://localhost:3000/api/tickets/imagem/'+ form, { headers: headers }).subscribe(status => {
        if (status.status == 200) {
          resolve(true);
        } else
          resolve(false);
      });
    });*/
  }

  base64ToArrayBuffer(base64) {
    var len = base64.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = base64.charCodeAt(i);
    }
    return bytes;
  }

  arrayToString(array){
    console.log(array);
    var str = "";
    for (var i=0; i < array.length; i++){
      str += String.fromCharCode(array[i]);
    }
    console.log('aqui');
    console.log(str);
  }
  
}
