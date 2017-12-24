import { UserService } from './../service/user.service';
import { UserLogin } from './../model/user-login';
import { Component, OnInit, OnChanges} from '@angular/core';
declare var jQuery:any; 
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

    userLogined:UserLogin;
    userLogin:UserLogin;
    groups:Array<any> = [
        {ID:"GP01",Name:"Nhom 1"},
        {ID:"GP02",Name:"Nhom 2"},
        {ID:"GP03",Name:"Nhom 3"}
      ]

  constructor(
      private userService:UserService
  ) { }

    checkerLogin:boolean;

//   CheckLogin(){
//     this.userService.GetInfoUserLogin();
//     let userLogin = localStorage.getItem('userLogin');
    
//     if(userLogin != null){
//       let user: UserLogin = JSON.parse(localStorage.getItem('userLogin'));
//       console.log(user.UserName);
        
//       this.userLogined = user;

//       return true;

//     }
//     return false;
//   }


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
    

    LogOut(){
        this.userService.Logout();
    }



  ngOnInit() {
      
      this.checkerLogin = this.userService.CheckingLogin();
      if(this.checkerLogin == true){
        let user: UserLogin = JSON.parse(localStorage.getItem('userLogin'));
        this.userLogined = user;
      }

    // ************************************************
    // ********** SLIDE HEADER - START
    // ************************************************

    $("#MenuIcon").click(function(){
      $("#MainMenu").css("left","0px");
      function showMenu(){
          $("#MainMenu").css("-webkit-clip-path","polygon(0 0,100% 0,100% 100%,0% 100%)");
          $("#MenuIcon").animate({left:'-100'},300);
      }
      setTimeout(showMenu,100);
      
    });
  
    $("li").click(function(){
        $("#MainMenu").css("-webkit-clip-path","polygon(0 0,0% 0,100% 100%,0% 100%)");
            function hideMenu(){
                $("#MainMenu").css("left","-300px");
                $("#MenuIcon").animate({left:'50'},300);
        }
        setTimeout(hideMenu,300);
  
        function originalLayout(){
            $("#MainMenu").css("-webkit-clip-path","polygon(0 0,100% 0,0% 100%,0% 100%)");
        }
        setTimeout(originalLayout,600);
    });

    $("#close").click(function(){
      $("#MainMenu").css("-webkit-clip-path","polygon(0 0,0% 0,100% 100%,0% 100%)");
      function hideMenu(){
              $("#MainMenu").css("left","-300px");
          $("#MenuIcon").animate({left:'50'},300);
      }
      setTimeout(hideMenu,300);
    
      function originalLayout(){
          $("#MainMenu").css("-webkit-clip-path","polygon(0 0,100% 0,0% 100%,0% 100%)");
      }
      setTimeout(originalLayout,600);
    });

    $(".container").dblclick(function(){
      $("#MainMenu").css("-webkit-clip-path","polygon(0 0,0% 0,100% 100%,0% 100%)");
      function hideMenu(){
              $("#MainMenu").css("left","-300px");
          $("#MenuIcon").animate({left:'50'},300);
      }
      setTimeout(hideMenu,300);
    
      function originalLayout(){
          $("#MainMenu").css("-webkit-clip-path","polygon(0 0,100% 0,0% 100%,0% 100%)");
      }
      setTimeout(originalLayout,600);
    });
    
    // ************************************************
    // ********** SLIDE HEADER - END
    // ************************************************



    //*******************************************
    //******* scroll and change navbar - START
    //*******************************************
    $(window).scroll(function(){
      let scrol = $(document).scrollTop();
      //console.log(scrol);
      if (scrol > 36) 
      {
        $('.navbar').addClass('shrink');
        $('.navbar').addClass('navbar-fixed-top');
      }
      else
      {
        $('.navbar').removeClass('shrink');
      }
    });
    //*******************************************
    //******* scroll and change navbar - END
    //*******************************************


  
    /********************************************\
          One Nice Scrolling NaveBar 
    \********************************************/
  
    //  $('.nav li a').on('click',function() {
    //     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    //     && location.hostname == this.hostname) {
    //         var $target = $(this.hash);
    //         $target = $target.length && $target
    //       || $('[name=' + this.hash.slice(1) +']');
    //     if ($target.length) {
    //           var targetOffset = $target.offset().top;
    //       $('html,body').animate({scrollTop: targetOffset}, 800);
    //      return false;
    //     }
    //   }
    // });

    
    // //*******************************************
    // //******* click to set active for link navbar - START
    // //*******************************************
    // $('.navbar-right > li > a').click(function(e) {
    //   $(".navbar-right > li > a").removeClass('actived');
    //   $(this).addClass('actived');
    //   e.preventDefault();
    // });

    // $('.navbar-brand').click(function(e){
    //   $(".navbar-right > li > a").removeClass('actived');
    //   e.preventDefault();
    // });
    // //*******************************************
    // //******* click to set active for link navbar - END
    // //*******************************************
    
  }

  ngOnChanges(){}
  
}

