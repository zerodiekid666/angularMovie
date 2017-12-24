import { Subscription } from 'rxjs/Subscription';


import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../model/user-login';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import $ from 'jquery';
@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.scss']
})
export class DangNhapComponent implements OnInit {
  
  userLogin:UserLogin;
  
  subscription:Subscription;

  groups:Array<any> = [
    {ID:"GP01",Name:"Nhom 1"},
    {ID:"GP02",Name:"Nhom 2"},
    {ID:"GP03",Name:"Nhom 3"}
  ]
  constructor(
    private userService:UserService,
    private router: Router,
    private location:Location
  ) { }

  ngOnInit() {
    
  }


  LoginUserForm(usLogin:UserLogin){
      this.userService.LoginForm(usLogin);
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
}
