
import { Injectable, OnDestroy } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserLogin } from '../model/user-login';
import { Router } from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import { Location } from '@angular/common';
declare var swal: any;

@Injectable()
export class UserService implements OnDestroy {
  
  //api for SignUp
  apiSignUp:string = 'http://sv.myclass.vn/api/user/registeruser';

  //api for Login
  apiLogin:string = 'http://sv.myclass.vn/api/user/login';

  subscription:Subscription;

  constructor(
    private _http:Http,
    private _router:Router,
    private _location:Location
  ) { }


  //SignUp Method
  signUp(user:User):Observable<any>{
      
      //To post to server we need header - body : dependence by backend
      let header = new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      //Body with param name data(server allowed)
      let body = `data=${JSON.stringify(user)}`;

      var obser = this._http.post(this.apiSignUp,body,{headers:header}).map( (data:Response) => data.json());
      return obser;
  }

  // Login Method
  Login(user:UserLogin){
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let body = `data=${JSON.stringify(user)}`;


    let userResult = new UserLogin();// Obj chua gia tri traVe
    let obser = this._http.post(this.apiLogin,body,{headers:header}).map( (data:Response) => data.json());
    this.subscription = obser.subscribe((result:any)=>{
        let kq = result;
        //console.log(kq);
        if(kq == 'The account or password is incorrect'){
          kq = null;
          
          swal(
            'Oops...',
            'Tài khoản hoặc mật khẩu không đúng!!!',
            'error'
          );
          localStorage.removeItem('userLogin');
        }
        else{
          //Dang nhap thanh cong thi luu thong tin vao localStorage
          userResult.UserName = kq.UserName;
          userResult.FullName = kq.FullName;
          userResult.Email = kq.Email;
          userResult.Status = kq.Status;
          userResult.GroupID = kq.GroupID;
          //xoa localStoge de tranh luu Chong
          localStorage.removeItem('userLogin');
          localStorage.setItem('userLogin', JSON.stringify(userResult));
          swal({
            title: "Đăng nhập thành công",
            type:'success',
            showCancelButton: false, // There won't be any cancel button
            showConfirmButton: false // There won't be any confirm button
          })


          
          setTimeout(() => swal.close(), 800);
          
          //setTimeout(() => this._location.back(), 800);
          setTimeout(() => window.location.reload(), 1000);
        }
    });
  }


  // Login Method
  LoginForm(user:UserLogin){
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let body = `data=${JSON.stringify(user)}`;


    let userResult = new UserLogin();// Obj chua gia tri traVe
    let obser = this._http.post(this.apiLogin,body,{headers:header}).map( (data:Response) => data.json());
    this.subscription = obser.subscribe((result:any)=>{
        let kq = result;
        //console.log(kq);
        if(kq == 'The account or password is incorrect'){
          kq = null;
          
          swal(
            'Oops...',
            'Tài khoản hoặc mật khẩu không đúng!!!',
            'error'
          );
          localStorage.removeItem('userLogin');
        }
        else{
          //Dang nhap thanh cong thi luu thong tin vao localStorage
          userResult.UserName = kq.UserName;
          userResult.FullName = kq.FullName;
          userResult.Email = kq.Email;
          userResult.Status = kq.Status;
          userResult.GroupID = kq.GroupID;
          //xoa localStoge de tranh luu Chong
          localStorage.removeItem('userLogin');
          localStorage.setItem('userLogin', JSON.stringify(userResult));
          swal({
            title: "Đăng nhập thành công",
            type:'success',
            showCancelButton: false, // There won't be any cancel button
            showConfirmButton: false // There won't be any confirm button
          })


          
          setTimeout(() => swal.close(), 800);
          
          setTimeout(() => this._router.navigate(['']),1000);
          setTimeout(() => window.location.reload(), 1500);
          window.scrollTo(0,0);
        }
    });
  }


  //Checking Login Method
  CheckingLogin():boolean {
      // checking that already have localStorage yet
      let user = localStorage.getItem('userLogin');
      if(user !== null){
        return true;
      }
      return false
  }

  //Get Info of User Login
  GetInfoUserLogin():UserLogin {
      if(this.CheckingLogin()){
          let user: UserLogin = JSON.parse(localStorage.getItem('userLogin'));
          console.log(user);
          return user;
      }
      return null;
  }

  //Logout
  Logout():void{
    swal({
      title: "Hẹn gặp lại",
      showCancelButton: false, // There won't be any cancel button
      showConfirmButton: false // There won't be any confirm button
    })
      setTimeout(() => swal.close(), 1000);
      localStorage.removeItem('userLogin');
      
      setTimeout(() => window.location.reload(), 1500);
      setTimeout(() => this._router.navigate(['']), 1000);

  }


  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
