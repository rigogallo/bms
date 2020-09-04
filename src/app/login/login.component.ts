import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import bmsUsers from "../../assets/users.json";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' ,'./utils.scss']
})
export class LoginComponent implements OnInit {
  users = bmsUsers;
  email = "";
  pass = "";
  loginFailed = false;
  
  constructor(private comSerive: CommunicationService,) { }

  ngOnInit() {
  }

  login() {
    if (this.users[this.email] !== undefined && this.users[this.email].pass == this.pass) { 
      this.comSerive.saveUserSession(this.email);
        this.comSerive.navigate('inicio');            
    }
    else {
      this.loginFailed = true;
    }
  }

}
