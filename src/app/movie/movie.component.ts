import { UserService } from './../service/user.service';



import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { MovieService } from '../service/movie.service';

import * as $ from 'jquery';
import { SearchMoviePipe } from '../pipes/search-movie.pipe';
import { Observable } from 'rxjs/Observable';
import { UserLogin } from '../model/user-login';




@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  
  //url Image
  urlImage:string = 'http://sv.myclass.vn/Images/Movies/';

  //Đối tượng sẽ nhận list phim từ api service - gán thẳng vào class Movie
  MovieList:Array<Movie>;
  MovieGroup:string = 'GP01';

  _data:any;


  userLogin:UserLogin;
  groups:Array<any> = [
    {ID:"GP01",Name:"Nhom 1"},
    {ID:"GP02",Name:"Nhom 2"},
    {ID:"GP03",Name:"Nhom 3"}
  ]


  //khởi tạo serviceMovie để dùng
  constructor(
    private _movieService:MovieService,
    private userService:UserService,
  ) { }



  LoginUsers(usLogin:UserLogin){
    this.userService.Login(usLogin);
    this.userLogin = usLogin;
    console.log(this.userLogin);
    if(this.userService.CheckingLogin() == true){
      
      console.log(this.userService.GetInfoUserLogin());
      //this.location.back();
    }
    else{
      console.log('tài khoản và mật khẩu không đúng');
      localStorage.removeItem('userLogin');
    }
}
  

  ngOnInit() {


    //console.log($('.navbar-nav > li > a'));


    


    this._movieService.GetMovieList().subscribe((data:any) =>{
      window.scrollTo(0,0);
      this._data = data;
      if(!data){
        $('#mainLoad').css('display', 'block');
      }else{
        $('#mainLoad').css('display', 'none');
        this.MovieList = data;  
      }
    },error =>{
      this.MovieList = error;
    });


    // $(window).scroll(function() {
    //   $(".slideanim").each(function(){
    //     var pos = $(this).offset().top;
        
    //     var winTop = $(window).scrollTop();
    //       if (pos < winTop + 5000) {
            
    //         $(this).addClass("slideAnim");
            
    //       }
    //   });
    // });

    $(window).scroll(function(){
      let scrol = $(document).scrollTop();
      //console.log(scrol);
      if (scrol > 150) 
      {
        $('form.wrapper').addClass('my-fixed');
      }
      else
      {
        $('form.wrapper').removeClass('my-fixed');
      }
    });

  }

}
