import { AlertyfyService } from './../../services/alertyfy.service';
import { User } from './../../app/model/user';
import { UserServiceService } from './../../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm: FormGroup;
  user: User;
  userSubmitted: boolean;

  constructor(private fb: FormBuilder
    , private userService: UserServiceService
    , private alertify: AlertyfyService) { }

  ngOnInit() {
    // this.registerationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    // }, this.passwordMatchingValidator);
    this.createRegisterationForm();
  }

  createRegisterationForm() {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, { validators: this.passwordMatchingValidator });
  }

  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { notmatched: true };
  }

  //getter method or all form control
  get username() {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerationForm.get('email') as FormControl;
  }

  get password() {
    return this.registerationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }

  onSubmit() {
    this.userSubmitted = true;
    if (this.registerationForm.valid) {     
      //this.user = Object.assign(this.user, this.registerationForm.value);
      this.userService.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('OK!');
    } else{
      this.alertify.error('Faild!');
      
    }
  }

  userData(): User{
    return this.user = {
      userName: this.username.value,
      email: this.email.value,
      mobile: this.mobile.value,
      password: this.password.value
    }
  }
}
