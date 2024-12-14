import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { IAPIResponse } from '../../model/model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit{

  eventService=inject(EventService);
  userObj:any;
  bookingList:any []=[];

  ngOnInit(): void {
    const loggedData=localStorage.getItem('eventUser');
    if(loggedData!=null){
      this.userObj=JSON.parse(loggedData);
      this.getBookingByUserId();
    }
  }

  getBookingByUserId(){
    this.eventService.GetBookingsByCustomer(this.userObj.userId).subscribe((res:IAPIResponse)=>{
      this.bookingList=res.data;
    })
  }

}
