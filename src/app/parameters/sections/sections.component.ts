import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  selectedSection = "";
  selectedParameter: any;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.communicationService.sectionSelected.subscribe(section => {      
      this.selectedSection = section;      
    });    
  }

  loadParameter(parameter) {    
    let data = {
      parameter: parameter,
      selectedSection: this.selectedSection
    }
    this.communicationService.parameterSelected.emit(data);
  }
}
