import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
var LZString = require('../../util/lz-string');

import { Http } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class TicketsService {

  constructor(private http: Http, private util: UtilService) { }

  salvar(dados) {
  var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var jsonData = JSON.stringify(dados);
    return this.http.post('http://localhost:3000/api/tickets/novo/'+jsonData, {headers: headers}).toPromise();
  }

}
