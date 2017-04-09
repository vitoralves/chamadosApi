import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'paginas',
  template: `
            <div class="wrapper">
              <header-component></header-component>

              <router-outlet></router-outlet>

              <footer-component></footer-component>
            </div>
  `

})

export class PaginasComponent {
  constructor() {  }
}
