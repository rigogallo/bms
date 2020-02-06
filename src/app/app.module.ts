import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './parameters/main/main.component';
import { SectionsComponent } from './parameters/sections/sections.component';
import { QuestionsComponent } from './parameters/questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SectionsComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
