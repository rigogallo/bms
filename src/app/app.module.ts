import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './parameters/main/main.component';
import { SectionsComponent } from './parameters/sections/sections.component';
import { QuestionsComponent } from './parameters/questions/questions.component';
import { FormComponent } from './parameters/form/form.component';
import { Routes, RouterModule } from '@angular/router';

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
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
