import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreeGamesService {

  url="https://geek-jokes.sameerkumar.website/api?format=json"
  constructor(private http: HttpClient) { }

  users(){
    return this.http.get(this.url)
  }
}
