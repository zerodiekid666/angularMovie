import { Injectable } from '@angular/core';
import { Movie } from '../model/movie';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {

  //api Movies
  apiGetMovie = 'http://sv.myclass.vn/api/movie/getmovie';

  //api Movies Detail
  apiGetMovieDetail = 'http://sv.myclass.vn/api/movie/GetMovieDetail';

  //api Movies Detail truyen vao` nhieu thamSo
  apiGetMovieDetailParams = 'http://sv.myclass.vn/api/movie/GetMovieDetailByGroup';

  constructor(private _http: Http) { }


  //method để lấy Movie List
  public GetMovieList(): Observable<Movie> {
    return this._http.get(this.apiGetMovie).map((data: Response) => data.json());
  }


  //method để lấy Movie Detail
  public GetMovieDetail(MovieID: number) {
    return this._http.get(`${this.apiGetMovieDetail}?id=${MovieID}`).map((data: Response) => data.json());
  }

  //lấy Movie Detail dựa vào nhiều tham số truyền vào
  public GetMovieDetailParams(MvID: number, GroupP: string):Observable<any> {
    let obsever: Observable<any> = this._http.get(`${this.apiGetMovieDetailParams}?id=${MvID}&groupID=${GroupP}`)
      .map((data: Response) => data.json());
    return obsever;
  }


  private apiLoadGhe =`http://sv.myclass.vn/api/movie/GetCinimaRoomDetail`;
  public LayDanhSachGhe(ShowTimeID:number):Observable<any[]> {
    let obServe:Observable<any> = this._http.get(`${this.apiLoadGhe}?ShowTimeID=${ShowTimeID}`).map((result:Response) => result.json());
    return obServe;
  }



  

}
