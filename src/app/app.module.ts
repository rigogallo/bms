import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './parameters/main/main.component';
import { SectionsComponent } from './parameters/sections/sections.component';
import { QuestionsComponent } from './parameters/questions/questions.component';
import { FormComponent } from './parameters/form/form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InformeComponent } from './parameters/informe/informe.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AyudaComponent } from './ayuda/ayuda.component';
import { QuestionariesComponent } from './parameters/questionaries/questionaries.component';
import {AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ReportNavComponent } from './report-nav/report-nav.component';
import { UsersComponent } from './admin/users/users.component';

const appRoutes: Routes = [
  { path: 'form', component: FormComponent },  
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    // RouterModule.forRoot(
		// 	appRoutes,
		// 	{ enableTracing: false } // <-- debugging purposes only
		//  ),
    AppComponent,
    MainComponent,
    SectionsComponent,
    QuestionsComponent,
    FormComponent,
    InformeComponent,
    HeaderComponent,
    LoginComponent,
    AyudaComponent,
    QuestionariesComponent,
    ReportNavComponent,
    UsersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
