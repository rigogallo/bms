import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './parameters/form/form.component';
import { MainComponent } from './parameters/main/main.component';
import { SectionsComponent } from './parameters/sections/sections.component';
import { InformeComponent } from './parameters/informe/informe.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AyudaComponent } from './ayuda/ayuda.component';
import { QuestionariesComponent } from './parameters/questionaries/questionaries.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'inicio', component: MainComponent,  canActivate: [AuthGuard]},
  { path: 'general', component: FormComponent,  canActivate: [AuthGuard]},  
  { path: 'parametros', component: SectionsComponent,  canActivate: [AuthGuard]},    
  { path: 'cuestionarios', component: QuestionariesComponent,  canActivate: [AuthGuard]},    
  { path: 'informe', component: InformeComponent,  canActivate: [AuthGuard]},  
  { path: 'ayuda', component: AyudaComponent,  canActivate: [AuthGuard]},  
  { path: 'login', component: LoginComponent, },  
  
  
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
