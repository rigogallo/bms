import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debug } from 'util';
import { CommunicationService } from '../communication.service';

// import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private comService: CommunicationService, private router: Router) { };

	canActivate (
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		let isAuthenticated = this.comService.isUserLogged();
          
		if(!isAuthenticated) {
			this.router.navigate(['/']);
			return false;
		}

		return true;
	}	

}
