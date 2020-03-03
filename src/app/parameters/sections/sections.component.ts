import { Component, OnInit, Output } from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  selectedSection = "";
  selectedParameter: any;
  sections: any;
  mainForm: any;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.mainForm = this.communicationService.getDataSession();
    this.sections = this.mainForm.sections;

    this.communicationService.sectionSelected.subscribe(section => {      
      this.selectedSection = section;      
    });    

    this.communicationService.questionChecked.subscribe(data => {
      //this.saveQuestion(data);
      this.updateForm(data);
    });

    this.communicationService.questionNotesAdded.subscribe(data => {
      this.updateNotes(data);
    });
  }

  updateNotes(data) {
    this.mainForm.sections.forEach(section => {
      if (section.name == data.section.name) {     
        section.parameters.forEach(parameter => {
          if (parameter.name == data.parameter.name) {           
            parameter.notes = data.parameter.notes;                   
          }          
        });
      }
    });
    this.sections = this.mainForm.sections;
    this.communicationService.saveDataSession(this.mainForm);    
  }

  updateForm(data) {
    let sectionsCompleted = 0;
     
    this.mainForm.sections.forEach(section => {
      if (section.name == data.section.name) {
        let parameterCount = section.parameters.length;
        let completedParameters = 0;    
        let sectionPoints = 0;    

        section.parameters.forEach(parameter => {
          if (parameter.name == data.parameter.name) {
            let questionCount = parameter.questions.length;
            let answeredQuestions = 0;
            let parameterPoints = 0;            

            parameter.questions.forEach(question => {
              if (question.id == data.questionId) {
                question.value = data.questionValue;
                answeredQuestions += 1;
                parameterPoints += data.questionValue                
              }
              else if (question.value > 0) {
                answeredQuestions += 1;
                parameterPoints += question.value;                
              }
            });
            if (questionCount == answeredQuestions) {
              parameter.completed = true;
              completedParameters += 1;
              parameter.parameterGrade = parameterPoints/questionCount;
              sectionPoints += parameter.parameterGrade;
            }   
            // parameter.notes = data.parameter.notes;                   
          }
          else if (parameter.completed) {
            completedParameters += 1;
            sectionPoints += parameter.parameterGrade;
          }
        });

        if (parameterCount == completedParameters) {
          section.completed = true;
          sectionsCompleted += 1;
          section.sectionGrade = sectionPoints/parameterCount;
        }
      }
      else {
        if (section.completed) {
          sectionsCompleted += 1;
        }
        
      }
    });   
    if (sectionsCompleted == this.mainForm.sections.length) {
      this.mainForm.sectionsCompleted = true;
      this.communicationService.sectionsCompleted.emit(true);
    }
    this.sections = this.mainForm.sections;
    this.communicationService.saveDataSession(this.mainForm);    
  }

  loadSection(section) {
    this.selectedSection = section;
    this.loadParameter(section.parameters[0]);
    //this.communicationService.sectionSelected.emit(section);
    //this.communicationService.parameterSelected.emit({ parameter: section.parameters[0], selectedSection: this.selectedSection });
  }

  loadParameter(parameter) {    
    let data = {
      parameter: parameter,
      selectedSection: this.selectedSection
    }    
    this.communicationService.parameterSelected.emit(data);
  }

  loadGeneralData(){
   this.communicationService.navigate('general');
  }

  goToReport(){
    this.communicationService.navigate('informe');
  }

  getColor(section) {
    return this.communicationService.getSectionColor(section);
  }
}
