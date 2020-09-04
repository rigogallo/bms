import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { convertSnaps } from './utils'
import { Informe } from './models/informe.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private db: AngularFirestore) { }

  getReportsByUser(userEmail: string): Observable<Informe[]> {
    return this.db.collection(
      'informes',
      ref => ref.where("emailUsuario", "==", userEmail)).snapshotChanges()
      .pipe(
          map(snaps => convertSnaps<Informe>(snaps)),
          first());
  }

  async deleteReportByID(reportID: string) {
   
    return await this.db.collection('informes').doc(reportID).delete().then(() => {return true}).catch(() => false);        
  }

  getReportByID(reportID: string) {
    return this.db.collection('informes').doc(reportID)
    .snapshotChanges()
    .pipe(        
        first()
    )
  }

  // getReportsByUser(userEmail: string): Observable<Informe[]> | any {        
  //   return this.db.collection('informes',
  //   ref=> ref.where("emailUsuario", "==", userEmail))
  //   .snapshotChanges().pipe(
  //     map(
  //       snaps => {
  //         snaps.map(snap => {                     
  //               return convertSnaps<Informe>(snaps); 
  //         }            
  //         )
  //         }
  //     ), first()
  //    )
  //     }    
}  
