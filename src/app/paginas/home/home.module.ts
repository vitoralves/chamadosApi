import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [ HomeService ]
})
export class HomeModule { }
