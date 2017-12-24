import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
// import Service
import { MovieService } from './../../service/movie.service';
import { TicketService } from './../../service/ticket.service';
//import Model
import { Ticket } from '../../model/Ticket';
import { ListTicket } from './../../model/ListTicket';
import { Ghe } from '../../model/ghe';
import { Movie } from './../../model/movie';

// jQuery and Sweet Alert
import * as $ from 'jquery';
import { Element } from '@angular/compiler';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-danh-sach-ghe',
  templateUrl: './danh-sach-ghe.component.html',
  styleUrls: ['./danh-sach-ghe.component.scss']
})
export class DanhSachGheComponent implements OnInit, OnDestroy {

  movieDetail: any = {};
  //api Image
  apiImage: string = 'http://sv.myclass.vn/Images/Movies/';

  movieID: number;
  movieGroup: string;

  showTimeID: number;
  subscription: Subscription;
  subscriptionParam: Subscription;
  subscriptionMovie: Subscription;

  Ghe: Array<Ghe>;
  Tickets: Array<Ticket> = [];
  ListTicket: any;

  soGheDaDat: number = 0;
  soGheChuaDat: number;
  price: number = 0;
  erroeees: string = 'Chưa có';
  _data;
  _data2;

  

  statusGhe = [];

  //Mãng ghế đã đặt
  idGheDaDat: Array<any> = [];

  constructor(
    private movieService: MovieService,
    private ticketService: TicketService,
    private router: Router,
    private location: Location,
    private activeRouter: ActivatedRoute
  ) { }

  //method lấy array value được chứa trong 1 array
  //->>tạo 1 mãng chứa key có trong các mãng cha
  CreateArrayKeyFromArrayParent(input, field) {
    var output = [];
    for (var i = 0; i < input.length; ++i)
      output.push(input[i][field]);
    return output;
  }
  
  //back to last page
  GoBack() {
    this.location.back();
  }


  //method bookTicket
  BookTicket() {

    if (this.Tickets.length == 0) {
      swal({
        title: "Bạn chưa chọn ghế",
        type: 'error',
        showCancelButton: false, // There won't be any cancel button
        showConfirmButton: false // There won't be any confirm button
      })
      setTimeout(() => swal.close(), 1200);
      //console.log('bạn chưa chọn ghế');
    } else {
      swal({
        title: "Xác nhận chọn ghế",
        type: "info",
        showCancelButton: true,
        cancelButtonText: "Huỷ chọn",
        cancelButtonColor: 'rgb(41, 40, 40)',
        confirmButtonColor: "#0288D1",
        confirmButtonText: "Chọn"

      }).then(() => {
        this.ticketService.BookingTicket(this.ListTicket).subscribe();
        swal({
          title: "Đặt ghé thành công",
          type: 'success',
          showCancelButton: false, // There won't be any cancel button
          showConfirmButton: false // There won't be any confirm button
        })
        setTimeout(() => swal.close(), 1000);
        setTimeout(() => window.location.reload(), 1200);
      }, (cancel) => {
        // swal({
        //   title: 'Cancelled',
        //   text: 'Action cancelled',
        //   type: 'error'
        // })
        // for(var i=0; i<this.Tickets.length; i++){
        //   if(this.Tickets[i]){
        //     this.Tickets.splice(i);
        //   }
        //   console.log(this.Tickets);
        // }


        // setTimeout(() => window.location.reload(), 1200);
        //this.idGheDaDat.splice(i);


        //console.log(this.idGheDaDat);

      });
      //setTimeout(() => swal.close(), 666);


      console.log('ok');
    }

  }


  ngOnInit() {

    
     
  
    this.subscriptionParam = this.activeRouter.queryParams.subscribe(params => {
      this.movieID = params['movieID'];
      this.movieGroup = params['movieGroup'];
      this.showTimeID = params['showTimeID'];

      //console.log(this.showTimeID);
    });


    // get DanhSachGhe
    this.subscription = this.movieService.LayDanhSachGhe(this.showTimeID).subscribe(data => {
      //console.log(data);
      if (data) {

        this._data = data;
        //console.log(data['Seats']);
        this.Ghe = data['Seats'];
        //console.log(this.Ghe);

        //lấy array Status chứa trong Array this.Ghe
        let result = this.CreateArrayKeyFromArrayParent(this.Ghe, 'Status');

        this.statusGhe.push(result);

        //console.log(this.statusGhe);

        // lọc Status == false
        //->lọc các value trong key
        let getFalses = this.statusGhe[0];
        let falseRs = getFalses.filter(getFalse => getFalse == false);
        //console.log(falseRs);
        this.soGheChuaDat = falseRs.length;

        // lọc Status == true
        //->lọc các value trong key
        let getTrues = this.statusGhe[0];
        let trueRs = getTrues.filter(getTrue => getTrue == true);
        //console.log(trueRs);
        this.soGheDaDat = trueRs.length;

        //Tạo body cho post BookTicket lên server
        let lstVe = new ListTicket();
        lstVe.ShowTimeID = this.showTimeID;
        lstVe.Tickets = this.Tickets;
        if (localStorage.getItem('userLogin') !== null) {
          let getUserInfoLocalStoge = JSON.parse(localStorage.getItem('userLogin'));
          lstVe.UserID = getUserInfoLocalStoge['UserName'];
          lstVe.GroupID = getUserInfoLocalStoge['GroupID'];
        }


        this.ListTicket = lstVe;


        //console.log(this.statusGhe[0].length);
        $('#mainLoad').css('display', 'none');
      } else {
        $('#mainLoad').css('display', 'block');
      }

    }, error => {
      console.log(error);
    });


    //get MovieDetail
    this.subscriptionMovie = this.movieService.GetMovieDetailParams(this.movieID, this.movieGroup).subscribe(data2 => {
      window.scrollTo(0, 0);
      this._data2 = data2;
      this.movieDetail = data2;
      //console.log(this.movieDetail);
    }, error => {
      this.movieDetail = error;
    });

  }

  DatGheParent(statusGhe, maGhe, price, seatID) {

    if (statusGhe) {

      this.soGheChuaDat--;
      this.soGheDaDat++;
      // tạo object để add vào mảng idGheDaDat
      let ob = { NumOrder: maGhe, status: statusGhe, Price: price };
      this.idGheDaDat.push(ob);
      //tạo ListTicket
      let ve = new Ticket();
      ve.SeatID = seatID;
      ve.Price = price;
      this.Tickets.push(ve);
      console.log(this.Tickets);

      console.log(this.ListTicket);

      //console.log(this.idGheDaDat[0].Price);
      //console.log(this.idGheDaDat);
      for (var i = 0; i < this.idGheDaDat.length; i++) {
        //lấy Giá của từng ghế
        let kq = this.idGheDaDat[i].Price;
        //console.log(kq);
        this.price += kq;  // cộng giá tiền theo từng ghế
        return kq;
      }
    } else {
      this.soGheChuaDat++;
      this.soGheDaDat--;

      // cách đễ xoá 1 obj dựa vào value của nó
      for (var i = 0; i < this.idGheDaDat.length; i++) {
        //lấy Giá của từng ghế
        let kq = this.idGheDaDat[i].Price;
        //console.log(kq);
        if (this.idGheDaDat[i].NumOrder === maGhe) {
          this.idGheDaDat.splice(i, 1);
          this.price -= kq; // trừ giá tiền theo từng ghế
        }
      }
      //console.log(this.idGheDaDat);

      // xoá vé khi click bỏ chọn
      for (var i = 0; i < this.Tickets.length; i++) {
        if (this.Tickets[i].SeatID === seatID) {
          this.Tickets.splice(i, 1);
        }
        console.log(this.Tickets);
      }
      console.log(this.ListTicket);
    }



  }








  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionParam) {
      this.subscriptionParam.unsubscribe();
    }

    if (this.subscriptionMovie) {
      this.subscriptionMovie.unsubscribe();
    }
  }

}
