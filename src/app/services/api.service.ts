import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7058/api/User';
  private Url: string = 'https://localhost:7058/api/Applicant';
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.baseUrl);
  }

getApplicant(){
  return this.http.get<any>(this.Url)
}

}