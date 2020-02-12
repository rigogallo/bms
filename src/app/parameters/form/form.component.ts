import { Component, OnInit, Input } from '@angular/core';
import bmsParameters from "../../../assets/main.json";
import { CommunicationService } from '../../communication.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formData: any;

  selectedSection: any;
  mainForm: any;
  sections: any;

  constructor(private comSerive: CommunicationService) { }

  ngOnInit() {
    console.log(this.formData);
    this.mainForm = this.formData;
    this.sections = this.formData.sections;

    this.comSerive.questionChecked.subscribe(data => {
      //this.saveQuestion(data);
      this.updateForm(data);
    });
    //this.comSerive.sectionSelected.emit(this.selectedSection);
    this.comSerive.parameterSelected.emit({ parameter: this.sections[0].parameters[0], selectedSection: this.sections[0] });
  }

  loadSection(section) {
    this.selectedSection = section;
    this.comSerive.sectionSelected.emit(section);
    this.comSerive.parameterSelected.emit({ parameter: section.parameters[0], selectedSection: this.selectedSection });
  }

  updateForm(data) {
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
          }
          else if (parameter.completed) {
            completedParameters += 1;
            sectionPoints += parameter.parameterGrade;
          }
        });

        if (parameterCount == completedParameters) {
          section.completed = true;
          section.sectionGrade = sectionPoints;
        }
      }
    });
    this.sections = this.mainForm.sections;
    this.comSerive.saveDataSession(this.mainForm);    
  }

}
