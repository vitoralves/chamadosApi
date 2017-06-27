import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

import { Http } from '@angular/http';
import { UtilService } from '../../util/util.service';

@Injectable()
export class ComponentesService {

  constructor(private http: Http, private util: UtilService) { }
  
  retornaTodosComponentes(){

  }

  apagarItem(){
    
  }
}
