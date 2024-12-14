import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { IAPIResponse, IEvent } from '../../model/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  eventList:IEvent[]=[]; //burası apı çağrımızda yanıt döneceği yapı, yani olay dinleyicisi. oluştrduğumuz arayüzü çağırdık.
  eventService=inject(EventService) //servisi inject edelim

  //sayfa açıldığında apimiz çalışacak
  ngOnInit(): void {
    this.getEvents();
  }

  //apiyi çağırdığımız fonksiyon, burada oluşturduğumuz arayüz yani modeli de çağırıyoruz.
  getEvents(){
    this.eventService.getAllEvents().subscribe((res:IAPIResponse)=>{
      this.eventList=res.data;
    })
  }
}
