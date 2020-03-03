import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  sessionStorageName = 'bmsData'
  sectionSelected: EventEmitter<any> = new EventEmitter();
  parameterSelected: EventEmitter<any> = new EventEmitter();
  questionChecked: EventEmitter<any> = new EventEmitter();
  questionNotesAdded: EventEmitter<any> = new EventEmitter();
  sectionsCompleted: EventEmitter<any> = new EventEmitter();
  
  constructor(private router: Router) { }

  saveDataSession(data){
    localStorage.setItem(this.sessionStorageName, JSON.stringify(data));
  }

  getDataSession() {
    return JSON.parse(localStorage.getItem(this.sessionStorageName));
  }

  navigate(path) {
    this.router.navigateByUrl('/'+ path);
  }

  getClassColor(grade) {
    let style = "bg-secondary";

    if (grade <= 1.66 && grade > 0) {
      style = "bg-danger";
    }

    if (grade > 1.66 && 2.33 > grade) {
      style = "bg-warning"
    }

    if (grade >= 2.33) {
      style = "bg-success"
    }
    
    return style;
  }

  getSectionColor(section) {

    let style = "btn-outline-secondary";

    if (section.completed && (section.sectionGrade < 1.66 && section.sectionGrade > 0)) {
      style = "btn-danger";
    }

    if (section.sectionGrade > 1.66 && 2.33 > section.sectionGrade) {
      style = "btn-warning"
    }

    if (section.sectionGrade >= 2.33) {
      style = "btn-success"
    }
    
    return style;
  }
}
