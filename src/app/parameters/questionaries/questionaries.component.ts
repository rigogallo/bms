import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReportsService } from 'src/app/reports.service';
import { CommunicationService } from 'src/app/communication.service';
import { Observable } from 'rxjs';
import { Informe } from '../../models/informe.model';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-questionaries',
  templateUrl: './questionaries.component.html',
  styleUrls: ['./questionaries.component.scss']
})
export class QuestionariesComponent implements OnInit {
  reports$: Observable<Informe[]>;
  reports: Informe[] = [];
  loading = false;

  constructor( private reportService: ReportsService,
    private comService: CommunicationService,
    private ngZone: NgZone) {        
   }

  ngOnInit() {  
    this.loadReportsDataByUser()
  }
  
  deleteReport(reportID) {
    const res = this.reportService.deleteReportByID(reportID);
    res.then(() => {this.loadReportsDataByUser()} )
  }
  
  loadReportsDataByUser(){    
    this.loading = true;      
    this.reports$ = this.reportService.getReportsByUser(this.comService.getUserSession()).pipe(finalize(() => this.loading = false))
    this.reports$.subscribe(data => {
      this.reports = data;
    })
    //this.reports$.forEach(rep => console.log(rep))
  }

  loadReport(reportID){
    const report = this.reportService.getReportByID(reportID);
    report.subscribe(data => {
      const mainForm = data.payload.data();
      this.comService.saveDataSession(mainForm);
      this.comService.navigate('/general')
    })
  }
}

