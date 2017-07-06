import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { HeaderService } from './header.service';
import { UtilService } from '../util/util.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ HeaderService ]
})
export class HeaderComponent implements OnInit {

  empresa: string;
  usuario;
  admin: boolean = false;
  avatar: any;
  nomeReduzido:string = '';

  constructor(private service: HeaderService, private util: UtilService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
      this.avatar = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64, '+this.usuario.imagem);
      this.admin = this.usuario.adm;
      this.service.getEmpresa(this.usuario.empresa).then(data => {
          this.empresa = data.data.nome;
          this.formaNomeReduzido(this.empresa);
      });
    });

     
  }

  formaNomeReduzido(nome: string){
    var split = nome.split(' ');
    for(var x=0;x<split.length;x++){
      console.log(split[x]);
      this.nomeReduzido += split[x].charAt(0);      
    }    
  }

}
