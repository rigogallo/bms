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

  constructor(private comSerive: CommunicationService,
    private router: Router,) { }

  ngOnInit() {
   
  }

  startEmpty(){
    // this.router.navigateByUrl('/form');
    this.showForm = true;
    this.bmsData = this.mainForm;
  }

  continueForm(){
    this.showForm = true;
    this.bmsData = this.comSerive.getDataSession();
  }

}
