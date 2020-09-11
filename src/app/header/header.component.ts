import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  canGenerateReport = false;

  constructor(private comSerive: CommunicationService,
    private db : AngularFirestore) { }

  ngOnInit() {
    this.comSerive.sectionsCompleted.subscribe(data => {
      this.canGenerateReport = data;
    });
    this.canGenerateReport = this.comSerive.getDataSession().sectionsCompleted; 
  }

  navigate(url) {    
    this.comSerive.navigate(url);
  }

  saveData(){
    const formID = this.comSerive.getDataSession().idForm;

    this.db.collection('informes').doc(formID).set(this.comSerive.getDataSession()).then( data => {
      console.log(data)
      console.log('Formulario Guardado')
    })
  }

  logout() {
    this.comSerive.signOut();
    // this.comSerive.logOut();
    this.comSerive.navigate('');
  }

}
