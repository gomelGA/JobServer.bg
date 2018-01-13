import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

//Models
import { RegisterJobseekerModel } from '../../models/jobseekers/register-jobseeker.model';

//Services
import { AuthenticationJobseekerService } from '../../../../core/authentication/jobseekers/auth-jobseeker.service';


const mailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'reg-jobseeker',
    templateUrl: './jobseeker-register-form.component.html',
    styleUrls: ['./jobseeker-register-form.component.css']
})
export class JobseekerRegisterFormComponent implements OnInit {
    public registerJobseekerForm: FormGroup;
    public jobSeekerRegModel: RegisterJobseekerModel;
    // public registeredJobseeker: string;
    // public registerSuccess: boolean;
    public registerFail: boolean;

    constructor(
        private fb: FormBuilder,
        private authJobseekerService: AuthenticationJobseekerService,
        private router: Router
    ) {
        this.jobSeekerRegModel = new RegisterJobseekerModel(false, "", "", "", "", "");
    }

    ngOnInit() {
        this.registerJobseekerForm = this.fb.group({
            username: ['', [Validators.minLength(2), Validators.maxLength(10)]],
            email: ['', [Validators.required, Validators.pattern(new RegExp(mailPattern))]],
            firstName: ['', [Validators.minLength(2), Validators.maxLength(25)]],
            lastName: ['', [Validators.required]],
            passwords: this.fb.group({
                password: ['', [Validators.required]],
                confirmPassword: ['', [Validators.required]]
            }, {
                    validator: this.matchPasswords
                })
        })
    }

    registerJobseeker(payload): void {
        let parsedPayload = payload.value;
        this.jobSeekerRegModel = {
            isEmployer: false,
            username: parsedPayload.username,
            email: parsedPayload.email,
            firstName: parsedPayload.firstName,
            lastName: parsedPayload.lastName,
            password: parsedPayload.passwords['password']
        }

        this.jobSeekerRegModel['advetisements'] = [];

        this.authJobseekerService.register(this.jobSeekerRegModel)
            .subscribe(
            data => {
                this.successfulRegister(data);
            },
            err => {
                this.registerFail = true;
            })
    }

    successfulRegister(data): void {
        // this.registerSuccess = true;
        // this.registeredJobseeker = data['username'];
        this.router.navigate(['jobseekers/login']);
    }

    matchPasswords(AC: AbstractControl) {
        let password = AC.get('password').value; //to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get("confirmPassword").setErrors({ MatchPassword: true })
        } else {
            return null;
        }
    }


}