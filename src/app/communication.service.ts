import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  sectionSelected: EventEmitter<any> = new EventEmitter();
  parameterSelected: EventEmitter<any> = new EventEmitter();
  questionChecked: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  saveDataSession(data){
    localStorage.setItem('bmsData', data);
  }
}
