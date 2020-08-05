import { AlertyfyService } from './../../services/alertyfy.service';
import { AuthService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService
    , private alertify: AlertyfyService
    , private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    const token = this.authService.authUser(loginForm.value);
    if (token) {
      localStorage.setItem('token', token.userName);
      this.alertify.success("Login successful");
      this.router.navigate(['/']);
    } else {
      this.alertify.error("Login failure")
    }
  }
}
