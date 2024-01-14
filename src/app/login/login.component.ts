import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoginSuccessful: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router // Inject Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(9)]],
    });
  }
  getUsername() {
    return this.loginForm.get('username')!;
  }
  getPassword() {
    return this.loginForm.get('password')!;
  }
 
  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.getUsername().value;
      const password = this.getPassword().value;
      this.authService.authenticate(username, password).subscribe(
        (isAuthenticated: boolean) => {
          if (isAuthenticated) {
            console.log('Login Successful!', this.loginForm.value);
            this.authService.setAuthenticated(true);
            this.isLoginSuccessful = true;
            this.showSnackBar('Login successful!');
            setTimeout(() => {
              this.router.navigate(['/banking']);
            }, 2000);
          } else {
            this.errorMessage = 'Invalid username or password';
            this.showSnackBar('Invalid username or password');
          }
        },
        (error: any) => {
          console.error('Error during authentication', error);
          this.errorMessage = 'An error occurred during authentication';
          this.showSnackBar('An error occurred during authentication');
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
 
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}