
import { Router } from '@angular/router';
import { Movie } from './../model/movie';
import { MovieService } from './../service/movie.service';
import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';


import * as $ from 'jquery';
declare var $: any;
import { Subscription } from 'rxjs/Subscription';
import {OwlCarousel} from 'ngx-owl-carousel';
import { UserService } from '../service/user.service';
import { UserLogin } from '../model/user-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    @ViewChild('owlEle') owlEle:OwlCarousel

    
  
    //url Image
    urlImage:string = 'http://sv.myclass.vn/Images/Movies/';
  
    //Đối tượng sẽ nhận list phim từ api service - gán thẳng vào class Movie
    MovieList:Array<Movie>;
  
    _data:any;

    MaNhom:string = 'GP01';
    
    subscription : Subscription;

    userLogin:UserLogin;
    groups:Array<any> = [
      {ID:"GP01",Name:"Nhom 1"},
      {ID:"GP02",Name:"Nhom 2"},
      {ID:"GP03",Name:"Nhom 3"}
    ]

    
    checkerLogin:boolean;
    userLogined:UserLogin;

    //khởi tạo serviceMovie để dùng
    constructor(
      private _movieService:MovieService,
      private userService:UserService,
      private router:Router
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

      

      setTimeout(() =>{
        $('.topTitle').addClass('animated')
        $('.topTitle').css('display', 'block')
        $('#owlCarousel').css('display','block')
        $('footer').css('display','block')
      }, 1500);

      // cheking user is logined
      this.checkerLogin = this.userService.CheckingLogin();
      if(this.checkerLogin == true){
        let user: UserLogin = JSON.parse(localStorage.getItem('userLogin'));
        this.userLogined = user;
      }

      console.log(this.checkerLogin);

      // get movie list
      this.subscription = this._movieService.GetMovieList().subscribe((data:any) =>{
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

      
      $(window).scroll(function() {
        $(".slideanim").each(function(){
          var pos = $(this).offset().top;
         
          var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
              
              $(this).addClass("slideAnim");
              
            }
        });
      });
    }// End - onInit

    ngOnDestroy(){
        if(this.subscription){
          this.subscription.unsubscribe();
        }
    }// End - onDestroy
}
