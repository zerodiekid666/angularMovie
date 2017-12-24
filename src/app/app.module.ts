

// Guard
import { AuthGuard } from './guard/auth.guard';
// Router
import { appRoutes } from './routing/app.routes';
import { RouterModule } from '@angular/router';
// Services
import { UserService } from './service/user.service';
import { MovieService } from './service/movie.service';
import { TicketService } from './service/ticket.service';
// Component
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { DangNhapComponent } from './form-dk-dn/dang-nhap/dang-nhap.component';
import { DangKiComponent } from './form-dk-dn/dang-ki/dang-ki.component';
import { DanhSachGheComponent } from './ghe/danh-sach-ghe/danh-sach-ghe.component';
import { GheNgoiComponent } from './ghe/ghe-ngoi/ghe-ngoi.component';
// Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MovieModule } from './movie/movie.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form-dk-dn/form/form.component';
// MyDatePicker
import { MyDatePickerModule } from 'mydatepicker';
//  your library
import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    DangNhapComponent,
    DangKiComponent,
    FormComponent,
    GheNgoiComponent,
    DanhSachGheComponent
  ],
  imports: [
    BrowserModule,
    MovieModule,
    HttpModule,
    appRoutes,
    RouterModule,
    FormsModule,
    MyDatePickerModule,
    OwlModule
  ],
  
  exports:[
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    DangNhapComponent,
    DangKiComponent,
    GheNgoiComponent,
    DanhSachGheComponent
  ],


  providers: [
    MovieService,
    UserService,
    TicketService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
