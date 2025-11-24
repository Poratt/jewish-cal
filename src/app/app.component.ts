import { Component, inject, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from './core/services/notification.service';
import { BasicCalComponent } from "./components/basic-cal/basic-cal.component";

@Component({
  selector: 'app-root',
  imports: [ToastModule, BasicCalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}