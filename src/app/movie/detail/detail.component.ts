import { UserLogin } from './../../model/user-login';
import { UserService } from './../../service/user.service';
import { Movie } from './../../model/movie';
import { ShowTime } from '../../model/showtime';

import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from './../../service/movie.service';
import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  //Đối tượng nhận MovieDetail bên MovieService
  MovieDetail:any = {};

  showTimes:any = [];
  //api Image
  apiImage:string = 'http://sv.myclass.vn/Images/Movies/';

  trailerMovie:string;
  safeUrl;
  
  
  MovieID:number;
  MovieGroup:string;
  
  _data:any;

  userLogin:UserLogin;
  groups:Array<any> = [
    {ID:"GP01",Name:"Nhom 1"},
    {ID:"GP02",Name:"Nhom 2"},
    {ID:"GP03",Name:"Nhom 3"}
  ]

  

  
  subscription : Subscription;
  subscriptionParams: Subscription;

  constructor(
    private _router:Router, 
    private _activatedRoute:ActivatedRoute, 
    private _movieService:MovieService,
    private _domSan:DomSanitizer,
    private userService:UserService,
   
    ) {   }


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
    
    setTimeout( () => $('.wrap-trailer iframe').css('box-shadow', '0 15px 25px rgba(0,0,0,.5)'), 1200);
    //lấy chi tiết phim thông qua ID ... lấy id
    //cắt lấy param truyền vào
    // this._activatedRoute.params.subscribe(thamso =>{
    //     this.MovieID = thamso['id'];
    // });

    //lấy chi tiết khi truyền vào 1 tham số : id
    // this._movieService.GetMovieDetail(this.MovieID).subscribe((data:any) =>{
    //   window.scrollTo(0,0);
    //   this._data = data;
    //   if(this._data === null){
    //     $('.load').css('display', 'block');
    //   }else{
    //     $('.load').css('display', 'none');
    //     this.MovieDetail = data;  
    //     this.trailerMovie = data.TrailerURI;
    //   }
    // },error =>{
    //   this.MovieDetail = error;
    // });
    
    // cắt params da truyên vào 
    this.subscriptionParams = this._activatedRoute.queryParams.subscribe(param =>{
        this.MovieID = parseInt(param['id']) ;
        this.MovieGroup = param['groupID'];
    });

    // lấy chi tiết phim khi truyền vào nhiều tham số
   this.subscription = this._movieService.GetMovieDetailParams(this.MovieID,this.MovieGroup).subscribe((data:any)=>{
        window.scrollTo(0,0);
        //console.log(data);
        if(!data){
          $('#mainLoad').css('display', 'block');
        }else{
          $('#mainLoad').css('display', 'none');
          this._data = data;
          this.MovieDetail = data;  
          this.showTimes = data['ShowTimes'];
          
          console.log(typeof(this.MovieDetail.TrailerURI));
          this.trailerMovie = data.TrailerURI;
          console.log(this.trailerMovie);
          this.safeUrl = this._domSan.bypassSecurityTrustResourceUrl(this.trailerMovie)
        }
    },error =>{
      this.MovieDetail = error;
    });
  }


  ngOnDestroy(){
      if(this.subscription){
        this.subscription.unsubscribe();
      }

      // if(this.subscriptionParams){
      //   this.subscriptionParams.unsubscribe();
      // }
  }
}
