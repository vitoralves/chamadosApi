import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { md5 } from '../../util/md5';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

import { UtilService } from '../../util/util.service';

@Injectable()
export class LoginService {

  constructor(private http: Http, private util: UtilService) {  }

  logar(email, senha){
      return this.http.get('http://localhost:3000/api/logar/'+email+'/'+md5(senha)+'/'+this.util.retornaToken()).map(res => res.json()).toPromise();
  }
}
