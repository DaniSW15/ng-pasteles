import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmationDialog } from './shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmationDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ng-pasteles';
}
