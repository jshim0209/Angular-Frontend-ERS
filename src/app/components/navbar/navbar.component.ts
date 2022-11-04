import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
  }

  isManager() {
    console.log(this.userService.getUser());
    if (this.userService.getUser().userRole === 'finance_manager') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    if(this.userService.getToken() != null) {
      return true;
    } else {
      return false;
    }
  }
}
