import { Component, OnInit, NgZone, OnDestroy, EventEmitter } from '@angular/core';
import { CommunicationService } from '../communication.service';
import bmsUsers from "../../assets/users.json";

import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserServiceService } from '../admin/user-service.service';
import { UserI } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './utils.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  users = bmsUsers;
  email = "";
  pass = "";
  loginFailed = false;
  ui: firebaseui.auth.AuthUI;
  // userLogged: UserI;
  

  constructor(
    private comSerive: CommunicationService,
    private afAuth: AngularFireAuth,
    private userService: UserServiceService,
    private ngZone: NgZone) {



  }
  ngOnDestroy(): void {
    // this.ui.delete();
  }

  ngOnInit() {
    // this.afAuth.auth.onAuthStateChanged(user => {
    //   // console.log(user)      
    //   this.comSerive.navigate('inicio');
    // })

    // const uiConfig = {
    //   signInOptions: [
    //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   ],
    //   callbacks: {
    //     signInSuccessWithAuthResult: this.onLoginSuccessfull.bind(this)
    //   }
    // }

    // this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    // this.ui.start('#firebaseUI', uiConfig);
    // if(this.comSerive.isUserLogged()) {
    //   this.comSerive.navigate('inicio');
    // }
  }

  // onLoginSuccessfull(result) {
  //   console.log(result);

  //   this.ngZone.run(() => {
  //     this.comSerive.saveUserSession(result.user.email);
  //     this.comSerive.navigate('inicio')
  //   });


  // }

  // login() {
  //   if (this.users[this.email] !== undefined && this.users[this.email].pass == this.pass) { 
  //     this.comSerive.saveUserSession(this.email);
  //       this.comSerive.navigate('inicio');            
  //   }
  //   else {
  //     this.loginFailed = true;
  //   }
  // }

  async login() {
    const user = await this.userService.signIn(this.email, this.pass);
    if (user) { 
      this.comSerive.saveUserSession(user);
      this.comSerive.navigate('inicio');
      this.comSerive.userLogged.emit();
    } else {

    }
  }

}
