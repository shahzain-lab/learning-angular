import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  signup({name, email, password}: {name: string, email: string, password: string}): Observable<any> {
    if(name && email && password){
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({name, email, password})
    }
    return throwError(new Error("failed to Signup")) 
  }

  login({name, password}: {name: string, password: string}): Observable<any> {
    if(name === "admin@gmail.com" && password === "admin123"){
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({name, password})
    }
    return throwError(new Error("failed to login"))
  }
}
