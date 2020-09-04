import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class InformeComponent implements OnInit {
  mainForm: any;
  result: any;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.mainForm = this.communicationService.getDataSession();
    this.result = JSON.stringify(this.mainForm);
    this.sendEmail();
  }

  getColor(grade) {
    return this.communicationService.getClassColor(grade);
  }

  goSections() {        
    this.communicationService.navigate('sections');    
  }

  sendEmail() {
   
  }
}
