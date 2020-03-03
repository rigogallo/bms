import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './parameters/form/form.component';
import { MainComponent } from './parameters/main/main.component';
import { SectionsComponent } from './parameters/sections/sections.component';
import { InformeComponent } from './parameters/informe/informe.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: MainComponent },
  { path: 'general', component: FormComponent },  
  { path: 'parametros', component: SectionsComponent },    
  { path: 'informe', component: InformeComponent },  
  { path: 'login', component: LoginComponent },  
  
  
  // { path: '**', component: PageNotFoundComponent }
  //always at the end, don't move it
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
