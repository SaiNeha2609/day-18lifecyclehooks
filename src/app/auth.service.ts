import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'nehaAyinala', password: 'nehaayinala1' },
  ];
 
  private isAuthenticatedValue: boolean = false;
  authenticate(username: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.username === username && u.password === password);
    this.isAuthenticatedValue = !!user; 
    return of(this.isAuthenticatedValue); 
  }
  setAuthenticated(value: boolean): void {     
    this.isAuthenticatedValue = value;  
   }
  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }
}