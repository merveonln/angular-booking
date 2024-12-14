import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import { IAPIResponse, IEvent, User } from '../../model/model';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [AsyncPipe,CommonModule,DatePipe,RouterLink,FormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {
  activatedRoute=inject(ActivatedRoute); //mevcut rota ne olursa olsun verileri etkinleştirilmiş rotadan almaya sorumlu olacak, buradan verileri yakalayabilirizz
  eventService=inject(EventService);
  eventData$:Observable<IEvent> = new Observable<IEvent> //htmlde yazdırma olmayacaksa bu şekilde yapı kullanılabilir
  events$:Observable<IEvent[]> = new Observable<IEvent[]>
  @ViewChild('model') model:ElementRef | undefined;

  members:any={
      "Name": "",
      "Age": 0,
      "IdentityCard": "",
      "CardNo": "",
      "ContactNo": ""
  }
  bookingObj:any={
      "BookingId": 0,
      "UserId": 0,
      "EventId": 0,
      "NoOfTickets": 0,
      "EventBookingMembers": [
      ]
  }
  userObj:any;

  constructor(){
    const loggedData=localStorage.getItem('eventUser');
    if(loggedData!=null){
      this.userObj=JSON.parse(loggedData);
      this.bookingObj.UserId=this.userObj.userId;
    }
    this.activatedRoute.params.subscribe((res:any)=>{
      this.bookingObj.EventId=res.id;
      this.eventData$ = this.eventService.getEventById(res.id);
      this.eventData$.subscribe((res:IEvent)=>{
        this.events$=this.eventService.getEventsByOrganizer(res.organizerId)
      })
    })
  }

  addMember(){
    const newob=JSON.stringify(this.members);
    const obj=JSON.parse(newob);
    this.bookingObj.EventBookingMembers.push(obj);
  }

  openModel(){
    if(this.model){
      this.model.nativeElement.style.display='block';
    }
  }

  closeModel(){
    if(this.model){
      this.model.nativeElement.style.display='none';
    }
  }

  onBooking(){
    this.bookingObj.NoOfTickets=this.bookingObj.EventBookingMembers.length;
    this.eventService.book(this.bookingObj).subscribe((res:IAPIResponse)=>{
      if(res.result){
        alert("Booking Success")
        this.closeModel();
      }
      else{
        alert(res.message)
      }
    })
  }
}
