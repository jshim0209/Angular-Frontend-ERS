import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpDto } from 'src/app/models/sign-up-dto';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // @Input() userRole!: UserRole;

  userRoles = [{id : 1, role : "employee"}, {id : 2, role : "finance_manager"}]

  registrationForm!: UntypedFormGroup;
  usernameIsEmpty: boolean = false;
  passwordIsEmpty: boolean = false;
  firstNameIsEmpty: boolean = false;
  lastNameIsEmpty: boolean = false;
  emailIsEmpty: boolean = false;
  userRoleIsEmpty: boolean = false;
  invalidUsername: boolean = false;
  invalidEmail: boolean = false;
  signUpDto!: SignUpDto;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: new UntypedFormControl('', [Validators.required, this.noWhitespaceValidator]),
      lastName: new UntypedFormControl('', [Validators.required, this.noWhitespaceValidator]),
      username: new UntypedFormControl('', [Validators.required, this.noWhitespaceValidator]),
      password: new UntypedFormControl('', [Validators.required, this.noWhitespaceValidator]),
      email: new UntypedFormControl('', [Validators.required, this.noWhitespaceValidator]),
      userRole: new UntypedFormControl('', [Validators.required]),
    });
  }

  noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace' : true };
  }

  register(){
    this.usernameIsEmpty = false;
    this.passwordIsEmpty = false;
    this.invalidUsername = false;

    if(this.registrationForm.valid) {
      this.signUpDto = {...this.registrationForm.value}

      console.log(this.signUpDto);

      this.registrationService.register(this.signUpDto).subscribe({
        next: (response) => {
          if(response.body?.jwt) {
            localStorage.setItem('jwt', response.body.jwt);
            localStorage.setItem('userId', response.body.userId);
            localStorage.setItem('username', response.body.username);
            localStorage.setItem('firstName', response.body.firstName);
            localStorage.setItem('userRole', response.body.userRole);

            console.log(localStorage.getItem('userRole'));



            this.router.navigate(['/login']);

          }
        },
        error: (error: any) => {
          console.log(error);
          this.invalidUsername = true;
        }
      });

    } else {
      if(!this.registrationForm.value.username.trim()) {
        this.usernameIsEmpty = true;
      }

      if(!this.registrationForm.value.password.trim()) {
        this.passwordIsEmpty = true;
      }
    }
  }

}
