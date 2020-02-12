import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  sessionStorageName = 'bmsData'
  sectionSelected: EventEmitter<any> = new EventEmitter();
  parameterSelected: EventEmitter<any> = new EventEmitter();
  questionChecked: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  saveDataSession(data){
    localStorage.setItem(this.sessionStorageName, JSON.stringify(data));
  }

  getDataSession() {
    return JSON.parse(localStorage.getItem(this.sessionStorageName));
  }
}
