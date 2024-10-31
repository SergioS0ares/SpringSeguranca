import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:8081"
  constructor(private http: HttpClient, private router: Router) { }


  login(username: string, password: string){
    return this.http.post(this.url + "/user/login", {username, password})
  }
}
