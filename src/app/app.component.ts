import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './sign-in.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'altabibPortal';
}
