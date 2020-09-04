import { Component, OnInit, Output } from '@angular/core';
import bmsParameters from "../../../assets/main.json";
import bmsUsers from "../../../assets/users.json";
import { CommunicationService } from '../../communication.service';
import { debug } from 'util';
import { Router } from '@angular/router';

// import * as firebase from "firebase/app";

// // Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
 
// };

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const settings = { timestampsInSnapshots: true};
// db.settings(settings);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  showForm = false;
  mainForm = bmsParameters; 
  users = bmsUsers; 
  bmsData: any;

  constructor(
    private communicationService: CommunicationService,
    private router: Router
    ) { }

  ngOnInit() {
  //   db.collection("cuestionarios").add(this.mainForm).then(function() {
  //     console.log("Document successfully written!");
  // });
  }

  startEmpty(){
    this.communicationService.saveDataSession(this.mainForm)
    this.communicationService.navigate('general');
  }

  continueForm(){
    // this.showForm = true;
    this.communicationService.navigate('cuestionarios');
    // this.bmsData = this.comSerive.getDataSession();
  }

}
