import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../communication.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  selectedParameter: any; 
  selectedSection: any 

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {  
    this.communicationService.parameterSelected.subscribe(data => {              
      this.selectedParameter = data.parameter;         
      this.selectedSection = data.selectedSection
    });
  }

  setQuestionValue(value, questionId){
    let data = {
      questionValue: value,
      questionId: questionId,
      parameter: this.selectedParameter,
      section: this.selectedSection
    }
    this.communicationService.questionChecked.emit(data);
  }

}
