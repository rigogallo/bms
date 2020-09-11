import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  styleUrls: ['./report-nav.component.scss']
})
export class ReportNavComponent implements OnInit {
  canGenerateReport = false;

  constructor(private comSerive: CommunicationService,
    private db: AngularFirestore) { }

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
    this.comSerive.savedClicked.emit()
  }
}
