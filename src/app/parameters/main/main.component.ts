import { Component, OnInit, Output } from '@angular/core';
import bmsParameters from "../../../assets/main.json";
import { CommunicationService } from '../../communication.service';
import { debug } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  showForm = false;
  mainForm = bmsParameters;  
  bmsData: any;

  constructor(
    private communicationService: CommunicationService,
    private router: Router
    ) { }

  ngOnInit() {
   
  }

  startEmpty(){
    this.communicationService.saveDataSession(this.mainForm)
    this.communicationService.navigate('general');
  }

  continueForm(){
    // this.showForm = true;
    this.communicationService.navigate('general');
    // this.bmsData = this.comSerive.getDataSession();
  }

}
