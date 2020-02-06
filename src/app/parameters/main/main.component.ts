import { Component, OnInit } from '@angular/core';
import bmsParameters from "../../../assets/main.json";
import { CommunicationService } from '../../communication.service';
import { debug } from 'util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  selectedSection: any;
  mainForm = bmsParameters;
  sections = bmsParameters.sections;
  constructor(private comSerive: CommunicationService) { }

  ngOnInit() {
    console.log(bmsParameters);
    this.comSerive.questionChecked.subscribe(data => {
      //this.saveQuestion(data);
      this.updateForm(data);
    });
    this.comSerive.sectionSelected.emit(this.selectedSection);
    this.comSerive.parameterSelected.emit({ parameter: this.sections[0].parameters[0], selectedSection: this.sections[0] });
  }

  loadSection(section) {
    this.selectedSection = section;
    this.comSerive.sectionSelected.emit(section);
    this.comSerive.parameterSelected.emit({ parameter: section.parameters[0], selectedSection: this.selectedSection });
  }

  saveQuestion(data) {
    this.mainForm.sections = this.mainForm.sections.map(section => {
      if (section.name == data.section.name) {
        section.parameters = section.parameters.map(parameter => {
          if (parameter.name == data.parameter.name) {
            parameter.questions = parameter.questions.map(question => {
              if (question.id == data.questionId) {
                question.value = data.questionValue;
                return question;
              }
              return question;
            });
            return parameter;
          }
          return parameter;
        });
        return section;
      }
      return section;
    })
    this.sections = this.mainForm.sections;
  }

  updateForm(data) {
    this.mainForm.sections.forEach(section => {
      if (section.name == data.section.name) {
        let parameterCount = section.parameters.length;
        let completedParameters = 0;        

        section.parameters.forEach(parameter => {
          if (parameter.name == data.parameter.name) {
            let questionCount = parameter.questions.length;
            let answeredQuestions = 0;

            parameter.questions.forEach(question => {
              if (question.id == data.questionId) {
                question.value = data.questionValue;
                answeredQuestions += 1;
              }
              else if (question.value > 0) {
                answeredQuestions += 1;
              }
            });
            if (questionCount == answeredQuestions) {
              parameter.completed = true;
              completedParameters += 1;
            }                      
          }
          else if (parameter.completed) {
            completedParameters += 1;
          }
        });

        if (parameterCount == completedParameters) {
          section.completed = true;
        }
      }
    });
    this.sections = this.mainForm.sections;
    console.log(this.sections);
  }

}
