import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="16and17";
  // constructor(private snackBar: MatSnackBar) {}
 
  // // Add this method
  // showLoginMessage(): void {
  //   this.snackBar.open('Please login first.', 'Close', {
  //     duration: 3000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'top',
  //   });
  // }
}
