import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/login-dto';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  loginDto!: LoginDto;
  isUsername: boolean = false;
  isPassword: boolean = false;
  invalidCredentials: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: UntypedFormBuilder
    ) {}

  ngOnInit(): void {

    this.isLoggedIn();

    this.loginForm = this.fb.group({
      username: new UntypedFormControl('', [Validators.required, this.noWhitespaceValidator]),
      password: new UntypedFormControl('', [Validators.required, this.noWhitespaceValidator]),
    });
  }

  noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace' : true };
  }

  login() {
    this.isUsername = false;
    this.isPassword = false;
    this.invalidCredentials = false;

    if (this.loginForm.valid) {
      this.loginDto = {
        ...this.loginForm.value
      }

      this.loginService.login(this.loginDto).subscribe({
        next: (response: any) => {
          if(response.body?.jwt) {
            localStorage.setItem('jwt', response.body.jwt);
            localStorage.setItem('userId', response.body.userId);
            localStorage.setItem('username', response.body.username);
            localStorage.setItem('firstName', response.body.firstName);
            localStorage.setItem('userRole', response.body.userRole);

            console.log(response.body);
            console.log(localStorage.getItem('jwt'));
            console.log(localStorage.getItem('userId'));
            console.log(localStorage.getItem('username'));
            console.log(localStorage.getItem('firstName'));
            console.log(localStorage.getItem('userRole'));

            response.body.userRole == 'employee' ? this.router.navigate(['employee-home']) : this.router.navigate(['manager-home']);

          }
          },
          error: (error: any) => {
          console.log(error);
          this.invalidCredentials = true;
          console.log(this.invalidCredentials);
          }
      });
      }else{
      if (!this.loginForm.value.username) {
        this.isUsername = true;
      }
      if (!this.loginForm.value.password) {
        this.isPassword = true;
      }
    }
  }

  isLoggedIn(){
    if(localStorage.getItem('jwt') != null) {
      return true;
    } else {
      return false;
    }
  }
}
