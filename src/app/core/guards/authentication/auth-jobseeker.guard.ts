import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationJobseekerService } from '../../authentication/jobseekers/auth-jobseeker.service';
import { AuthenticationEmployerService } from '../../authentication/employers/auth-employer.service';

@Injectable()
export class AuthJobseekerGuard implements CanActivate {
    constructor(
        private router: Router,
        private authJobseekerService: AuthenticationJobseekerService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authJobseekerService.isAuthed()) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
