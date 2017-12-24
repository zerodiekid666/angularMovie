import { AuthGuard } from './../guard/auth.guard';
import { DanhSachGheComponent } from './../ghe/danh-sach-ghe/danh-sach-ghe.component';
import { DangNhapComponent } from './../form-dk-dn/dang-nhap/dang-nhap.component';
import { DangKiComponent } from './../form-dk-dn/dang-ki/dang-ki.component';

import { Routes, RouterModule, CanActivate } from '@angular/router';

import { DetailComponent } from '../movie/detail/detail.component';
import { MovieComponent } from './../movie/movie.component';
import { HomeComponent } from './../home/home.component';
import { FormComponent } from '../form-dk-dn/form/form.component';



const pathRouting: Routes = [
      {
            path: '',
            component: HomeComponent,
            pathMatch: 'full'
      },

      {
            path: 'movielist',
            component: MovieComponent
      },
      // {
      //       path:'moviedetail/:id', // <= truyển vào params id
      //       component: DetailComponent
      // },
      {
            path: 'moviedetail',
            component: DetailComponent
      },
      {
            path:'ghe',
            component : DanhSachGheComponent,
            canActivate : [AuthGuard]
      },
      {
            path: 'form',
            component: FormComponent,
            children: [
                  {
                        path: 'signup',
                        component: DangKiComponent
                  },
                  {
                        path: 'login',
                        component: DangNhapComponent
                  },
            ]
      },
     
]

export const appRoutes = RouterModule.forRoot(pathRouting); 