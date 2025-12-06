import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { BasicCalComponent } from "./components/basic-cal/basic-cal.component";

@Component({
  selector: 'app-root',
  imports: [ToastModule, BasicCalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}