import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { convertSnaps } from './utils'
import { Informe } from './models/informe.model';
import bmsParameters from "../assets/main.json";
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
mainForm = bmsParameters;

  constructor(private db: AngularFirestore,
    private comService: CommunicationService) { }

  getReportsByUser(userEmail: string): Observable<Informe[]> {
    return this.db.collection(
      'informes',
      ref => ref.where("emailUsuario", "==", userEmail)).snapshotChanges()
      .pipe(
          map(snaps => convertSnaps<Informe>(snaps)),
          first());
  }

  async deleteReportByID(reportID: string) {
   
    return await this.db.collection('informes').doc(reportID).delete().then(() => {return true}).catch(() => {return false});        
  }

  getReportByID(reportID: string) {
    return this.db.collection('informes').doc(reportID)
    .snapshotChanges()
    .pipe(        
        first()
    )
  }

  getNewReport(){
    this.comService.saveDataSession(this.mainForm)
    this.comService.navigate('general');
}   
}  
