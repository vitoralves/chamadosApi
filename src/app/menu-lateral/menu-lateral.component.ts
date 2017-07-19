import { DomSanitizer } from '@angular/platform-browser';
import { UtilService } from './../util/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  usuario: any;
  admin: boolean = false;
  avatar: any;

  constructor(private util: UtilService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
      if (this.usuario.imagem === null) {
        this.avatar = this.sanitizer.bypassSecurityTrustUrl(this.util.retornaBytesAvatar());
      } else {
        this.avatar = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64, ' + this.usuario.imagem);
      }
      this.admin = this.usuario.adm;
    });
  }

}
