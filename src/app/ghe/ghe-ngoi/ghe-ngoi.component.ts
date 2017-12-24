import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-ghe-ngoi',
  templateUrl: './ghe-ngoi.component.html',
  styleUrls: ['./ghe-ngoi.component.scss']
})
export class GheNgoiComponent implements OnInit {

  
  @Output() evenDatGhe = new EventEmitter();
  
  @Input('numOrder') numOrder:number;
  
  public statusGhe:boolean;

  constructor() { }
  @Input() chose:boolean;
  ngOnInit() {
    
  }


  DatGhe(value:boolean){
    if(value == true){
        this.statusGhe = false;
    }else{
        this.statusGhe = true;
    }

    this.evenDatGhe.emit(this.statusGhe); // ouput trangThai ra ben ngoai
  }

}
