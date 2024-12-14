import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IAPIResponse, User } from './model/model';
import { FormsModule } from '@angular/forms';
import { EventService } from './services/event.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,RouterLink,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-booking-project';
}
