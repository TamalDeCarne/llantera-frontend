import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  frmEmail = new FormControl('', [Validators.required, Validators.email]);
  frmPsw = new FormControl('', [Validators.minLength(6), Validators.maxLength(10)]);

  roles: String[] = ['Administrator', 'User', 'Anonymous'];

  username: String;
  email: String;
  password: String;
  role: String;

  onClick() {
    alert(this.username);
  }

  constructor() { }

  ngOnInit() {
  }

}
