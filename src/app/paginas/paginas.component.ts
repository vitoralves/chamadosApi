import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'paginas',
  templateUrl: './paginas.component.html'
})

export class PaginasComponent implements OnInit{
  constructor(private rota: Router) {  }

  ngOnInit(){
    if(this.rota.url === '/'){
      this.rota.navigate(['/pages/home'])
    }
  }
}
