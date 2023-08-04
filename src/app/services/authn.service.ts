import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenuserApiModel } from '../models/tokenuser-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthnService {

  // private baseUrl: string = 'https://localhost:7058/api/User/';
  private Url: string = 'https://localhost:7058/api/Applicant/';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }
  
   signUp(userObj: any) {
    return this.http.post<any>(`${this.Url}register`, userObj)
  }
  

  signIn(loginObj : any){
    return this.http.post<any>(`${this.Url}authenticate`,loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  

  //client login

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenuserApiModel){
    return this.http.post<any>(`${this.Url}refresh`, tokenApi)
  }
//applicant login




}
