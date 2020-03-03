import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' ,'./utils.scss']
})
export class LoginComponent implements OnInit {

  constructor(private comSerive: CommunicationService,) { }

  ngOnInit() {
  }

  login() {
    this.comSerive.navigate('inicio');
  }

}
