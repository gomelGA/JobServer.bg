import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

//Models
// import { LoginEmployerModel } from '../models/employers/login-employer.model';
import { LoginModel } from '../models/jobseekers/login-jobseeker.model';

//Services
import { AuthenticationJobseekerService } from '../../../core/authentication/jobseekers/auth-jobseeker.service';
import { AuthenticationEmployerService } from '../../../core/authentication/employers/auth-employer.service';

const mailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    public userType: string; 
    public loginModel;
    public loginForm: FormGroup
    public loginFail: boolean;

    constructor(
        private fb: FormBuilder,
        private authEmployerService: AuthenticationEmployerService,
        private authJobseekerService: AuthenticationJobseekerService,
        private router: Router
    ) {
        this.userType = this.findUserType(window.location.href);
        this.loginModel = new LoginModel("", "");
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2)]],
            password: ['', [Validators.required]]
        })
    }

    login(payload) {
        let parsedPayload = payload.value;
        this.loginModel = {
            username: parsedPayload.username,
            password: parsedPayload.password
        }

        if (this.userType === 'jobseekers') {
            this.authJobseekerService.login(this.loginModel)
                .subscribe(
                data => {
                    this.successfulLogin(data);
                },
                err => {
                    this.loginFail = true;
                })

                this.authJobseekerService.isUserLogged.emit(true);
        } else {
            this.authEmployerService.login(this.loginModel)
                .subscribe(
                data => {
                    this.successfulLogin(data);
                },
                err => {
                    this.loginFail = true;
                })

                this.authEmployerService.isUserLogged.emit(true); 
        }
    }

    private findUserType(currentUrl: string): string {
        let userType = currentUrl.split('/')[3];
        return userType;
    }

    private successfulLogin(data): void {
        if (this.userType === 'jobseekers') {
            this.authJobseekerService.isUserLogged.emit(true);
            this.authJobseekerService.authtoken = data['_kmd']['authtoken'];
        } else {
            this.authEmployerService.isUserLogged.emit(true);
            this.authEmployerService.authtoken = data['_kmd']['authtoken'];
        }


        localStorage.setItem('authtoken', data['_kmd']['authtoken']);
        if (data['isEmployer']) {
            localStorage.setItem('user', data['entityName']);
        } else {
            localStorage.setItem('user', data['firstName']);
        }

        if(data._kmd.roles) {
            localStorage.setItem('isAdmin', "true");
        } else {
            localStorage.setItem('isAdmin', "false")
        }

        localStorage.setItem('username', data['username']);
        localStorage.setItem('isEmployer', data['isEmployer']);
        localStorage.setItem('creator', data['_acl']['creator']);
        localStorage.setItem('advertisements', data['advetisements']);
        localStorage.setItem('email', data['email']);
        localStorage.setItem('firstName', data['firstName']);
        localStorage.setItem('lastName', data['lastName']);
        this.loginFail = false;
        this.router.navigate(['']);
    }
}


