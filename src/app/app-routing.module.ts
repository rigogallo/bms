import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './parameters/form/form.component';
import { MainComponent } from './parameters/main/main.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'form', component: FormComponent },  
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
