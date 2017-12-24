import { ListTicket } from './../model/ListTicket';
import { Http, Headers,Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subscription} from "rxjs/Subscription";
import { Injectable } from '@angular/core';

@Injectable()
export class TicketService {
  
  apiUrlPostBookingTickets = 'http://sv.myclass.vn/api/movie/BookingTickets';

  
  constructor(
    private _http:Http,
    
  ) { }

  BookingTicket(InfoTicket:ListTicket){
    
      let header = new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      let body = `data=${JSON.stringify(InfoTicket)}`;
      
      var obser = this._http.post(this.apiUrlPostBookingTickets, body, {headers:header}).map( (result:Response) =>{
          result.json();
      });
      return obser;
  }

}
