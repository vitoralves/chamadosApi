import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class UsuariosService {

  constructor(private http: Http, private util: UtilService) {

  }

  retornaTodosUsuarios(){
    return this.http.get('http://localhost:3000/api/usuarios/all/'+this.util.retornaToken()).map(res => res.json()).toPromise();
  }

  apagarItem(id: number){
    return this.http.delete('http://localhost:3000/api/usuario/delete/'+id).map(res => res.json()).toPromise();
  }
}
