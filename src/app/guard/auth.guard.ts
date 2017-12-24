import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

declare var swal: any;
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router
  ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(localStorage.getItem('userLogin')){
      return true;
    }else{
      swal({
        title: "Xin chào!",
        text:"Bạn cần phải đăng nhập để đặt vé",
        type: "info",
        showCancelButton: true,
        showCloseButton: true,
        showConfirmButton: false,
        
        confirmButtonColor: "#0288D1",
        confirmButtonText: "Đăng kí",
       
        html:
        'Bạn cần phải ' +
        '<a href="/form/login">Đăng nhập</a> ' +
        'để đặt vé <br>' + 
        'nếu chưa có tài khoản hãy ' +
        '<a href="/form/signup">Đăng Kí</a> '
       
        
      }).then( (result) =>{
          if(result.value){
            
            this.router.navigate(['/form/login']);
            //result.dismiss can be 'cancel' , 'overlay'
            // 'close' , and 'timer'
          } else if(result.dismiss == 'cancel'){
            
            this.router.navigate(['/form/signup']);
          }
      });
    }
    return false;
    
  }
}
