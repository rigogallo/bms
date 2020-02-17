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
}
