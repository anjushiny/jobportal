import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserStoreService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProjectSPAN';
  public users:any = [];
  public role!:string;

  public FirstName : string = "";
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

    // this.userStore['getFirstNameFromStore']()   
    
    // .subscribe((val: any)=>{
    //   const FirstNameFromToken = this.auth.getfullNameFromToken();
    //   this.FirstName = val || FirstNameFromToken
    // });

    this.userStore.getRoleFromStore()
    .subscribe((val: any)=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    })
  }

  logout(){
    this.auth.signOut();
  }
}
