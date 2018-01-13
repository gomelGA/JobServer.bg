import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationEmployerService } from '../../authentication/employers/auth-employer.service';

@Injectable()
export class AuthEmployerGuard implements CanActivate {
    constructor(
        private router: Router,
        private authEmployerService: AuthenticationEmployerService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authEmployerService.isAuthed()) {
            this.router.navigate(['/login']);
            return false;
        } 
        
        return true;
    }
}
