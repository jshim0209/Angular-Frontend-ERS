import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/login-dto';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService,
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
            this.userService.setToken(response.headers.get('Token'));
            this.userService.setUser(response.body);

            const role = response.body.userRole;
            role == 'employee' ? this.router.navigate(['employee-home']) : this.router.navigate(['manager-home']);

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
    if(this.userService.getToken() != null) {
      return true;
    } else {
      return false;
    }
  }
}
