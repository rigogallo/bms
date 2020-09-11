import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment} from '../environments/environment'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase-admin"

firebase.initializeApp(environment.firebaseConfig);
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  sessionStorageName = 'bmsData';
  sessionStorageUser = 'bmsUser';
  sectionSelected: EventEmitter<any> = new EventEmitter();
  parameterSelected: EventEmitter<any> = new EventEmitter();
  questionChecked: EventEmitter<any> = new EventEmitter();
  questionNotesAdded: EventEmitter<any> = new EventEmitter();
  sectionsCompleted: EventEmitter<any> = new EventEmitter();
  saveForm: EventEmitter<void> = new EventEmitter();
  savedClicked: EventEmitter<void> = new EventEmitter();
  
  constructor(private router: Router,    
    private db: AngularFirestore,
    private afAuth: AngularFireAuth) {
    // this.saveForm.subscribe(
    //   this.saveFormData()
    // )
   }

  saveDataSession(data){
    localStorage.setItem(this.sessionStorageName, JSON.stringify(data));
  }

  getDataSession() {
    return JSON.parse(localStorage.getItem(this.sessionStorageName));
  }

  saveUserSession(email) {
    localStorage.setItem(this.sessionStorageUser, email);
  }

  saveFormData(){
    const formID = this.getDataSession().idForm;    
    this.db.collection('informes').doc(formID).set(this.getDataSession()).then( data => {      
      console.log('Formulario Guardado')
    })
  }

  getUserSession() {
    return localStorage.getItem(this.sessionStorageUser);
  }

  signOut() {
    this.afAuth.auth.signOut();    
    this.logOut();
  }

  logOut() {
    localStorage.removeItem(this.sessionStorageUser);
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

  isUserLogged(){
    return this.getUserSession() == undefined ? false : true;
  }
}
