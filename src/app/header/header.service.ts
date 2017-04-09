import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { UtilService } from '../util/util.service';

@Injectable()
export class HeaderService {

  constructor(private http: Http, private util: UtilService) { }

  getEmpresa(id: number){
    return this.http.get('http://localhost:3000/api/empresa/'+id+'/'+this.util.retornaToken()).map(res => res.json()).toPromise();
  }

}
