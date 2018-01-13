import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../../core/authentication/auth.service';
import { Router } from "@angular/router";
import { AuthenticationJobseekerService } from '../../../core/authentication/jobseekers/auth-jobseeker.service';
import { AuthenticationEmployerService } from '../../../core/authentication/employers/auth-employer.service';

@Component({
    template: ''
})
export class LogoutComponent implements OnInit {
    isEmployer: boolean;

    constructor(
        private authJobseekerService: AuthenticationJobseekerService,
        private authEmployerService: AuthenticationEmployerService,
        private router: Router
    ) {
        this.isEmployer = localStorage.getItem('isEmployer') ? true : false;
    }

    ngOnInit() {
        if (!this.isEmployer) {
            this.authJobseekerService.logout()
                .subscribe(data => {
                    localStorage.clear();
                    this.router.navigate(['/jobseekers/login']);
                })

            this.authJobseekerService.isUserLogged.emit(false);
        } else {
            this.authEmployerService.logout()
                .subscribe(data => {
                    localStorage.clear();
                    this.router.navigate(['employers/login']);
                })

            this.authEmployerService.isUserLogged.emit(false);
        }

    }
}