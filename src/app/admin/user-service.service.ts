import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { find, catchError, map, first, exhaustMap, take, flatMap, mergeMap } from "rxjs/operators";
import { Config } from 'protractor';
import { environment } from '../../environments/environment'
import { User, UserI } from '../models/user.model';
import { convertSnaps } from '../utils';
import { debug } from 'console';
import { AngularFireAuth } from '@angular/fire/auth';


export interface UserResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private httpClient: HttpClient,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth, 
  ) { }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  createNewUSer(email: string, password: string) {
    return this.httpClient.post<UserResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseConfig.apiKey,
      { email, password, returnSecureToken: true })
  }

  getAllUsers() {
    return this.db.collection(
      'usuarios').snapshotChanges()
      .pipe(
        map(snaps => convertSnaps<User>(snaps)),
        first());
  }

  async signIn(email, password) {
    // return await this.afAuth.auth.signInWithEmailAndPassword(email, password);

    try {
      const { user } = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      let userFullData = new User(); 
      await this.getUserFullData(user.uid).then(
        data => userFullData = <User>data.data()
      )            
      return this.convertUser(user, userFullData ? userFullData.isAdmin : false);
    } catch (error) {
      console.log(error);
    }
  }

  convertUser(user: firebase.User, isAdmin: boolean = false): UserI {
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: isAdmin
    }
  }

  private updateUserData(user: UserI) {
    const userRef: AngularFirestoreDocument<UserI> = this.db.doc(
      `users/${user.uid}`
    );

    const data: UserI = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: 'ADMIN',
    };

    return userRef.set(data, { merge: true });
  }

  private async getUserFullData(userUI: string) {
    
    return await this.db.collection<User>(
      'usuarios').doc(userUI).get().toPromise().then( result => {
        console.log(result)
        return result})    
  }

  deleteUserAccount(user: User) {    
    return this.httpClient.post<UserResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseConfig.apiKey,
      { email: user.email, password: user.password, returnSecureToken: true }).pipe(
        mergeMap((userLogged) =>
        {return this.httpClient.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=' + environment.firebaseConfig.apiKey, { idToken: userLogged.idToken })}        
      ));
          
 



    // this.httpClient.post<UserResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseConfig.apiKey, { email: user.email, password: user.pass, returnSecureToken: true }).subscribe(
    //   data => {
    //     this.httpClient.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=' + environment.firebaseConfig.apiKey, { idToken: data.idToken }).subscribe(
    //       deleteResponse => { 
    //         this.db.collection('usuarios').doc(user.userID).delete().then(() => {return true}).catch(() => {return false});   
    //       }
    //     )
    //   }
    // )

    // 

    // return await this.db.collection('informes').doc(reportID).delete().then(() => {return true}).catch(() => {return false});        
  }

  deleteUserFromDB(user){
   return this.db.collection('usuarios').doc(user.userID).delete().then(() => {return true}).catch(() => {return false});   
}

  saveNewUser(user: User) {    
    return this.db.collection('usuarios').doc(user.uid).set({...user})
  }

}
