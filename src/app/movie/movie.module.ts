



import { MovieService } from './../service/movie.service';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { DetailComponent } from './detail/detail.component';
//import Router để component MovieComponent hiểu dc [routerLink]
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SearchMoviePipe } from '../pipes/search-movie.pipe';





@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    MovieComponent,
    DetailComponent,
    SearchMoviePipe
  ],
  
  exports:[
    MovieComponent,
    DetailComponent,
    SearchMoviePipe
  ],

  providers:[ MovieService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MovieModule { }
