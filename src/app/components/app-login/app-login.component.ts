import { Router } from '@angular/router';
import { AuthnService } from 'src/app/services/authn.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validationform';
import { NgToastService } from 'ng-angular-popup';

import { AppStoreService } from 'src/app/app-store.service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    private auth: AuthnService,
    private router: Router,
    private toast: NgToastService,
    private appstore: AppStoreService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.appstore.setFullNameForStore(tokenPayload.name);
          this.appstore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 3000});
          this.router.navigate(['app-dashboard'])
        },
        error: (err) => {
          const errorMessage = err.error.message;
          this.toast.error({detail: "ERROR", summary: errorMessage, duration: 50000});
          console.log(err);

        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
