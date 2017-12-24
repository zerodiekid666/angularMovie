

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
declare var swal: any;
@Component({
  selector: 'app-dang-ki',
  templateUrl: './dang-ki.component.html',
  styleUrls: ['./dang-ki.component.scss']
})
export class DangKiComponent implements OnInit, OnDestroy {

  subcription: Subscription;
  userSignUp: User;
  groups:Array<any> = [
    {ID:"GP01",Name:"Nhom 1"},
    {ID:"GP02",Name:"Nhom 2"},
    {ID:"GP03",Name:"Nhom 3"}
  ]
  constructor(
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit() {
      this.userSignUp = new User();
  }

  SignUpUsers(user:any){
    let dt = user.DateOfBirth.formatted;
    user.DateOfBirth = dt;
    
    this.subcription = this.userService.signUp(user).subscribe(data =>{
        this.userSignUp = data;
        //console.log(this.userSignUp);
        console.log(data);

        // If user already exist...
        if(data == 'Username already exists'){
          console.log('user exist');
          swal({
            title: "Tài khoản có người đăng kí",
            type:'warning',
            showCancelButton: false, // There won't be any cancel button
            showConfirmButton: false // There won't be any confirm button
          })
        }else if(this.userSignUp){
          console.log('dk thành công');
          swal({
            title: "Đăng kí thành công",
            type: "success",
            showCancelButton: true,
            showCloseButton: true,
            showConfirmButton: true,
            
            confirmButtonColor: "#0288D1",
            confirmButtonText: "Tiếp tục đăng nhập",
           
          }).then((result) =>{
            if(result){
              
              this.router.navigate(['/form/login']);
              //result.dismiss can be 'cancel' , 'overlay'
              // 'close' , and 'timer'
            }
            });
        }
    },error =>{
        console.log(error);
    });
  }

  ngOnDestroy() {
    if(this.subcription){
      this.subcription.unsubscribe();
    }
  }


  

}
