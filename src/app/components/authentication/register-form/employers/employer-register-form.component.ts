import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

//Models
import { RegisterEmployerModel } from '../../models/employers/register-employer.model';

//Services
import { AuthenticationEmployerService } from '../../../../core/authentication/employers/auth-employer.service';

const mailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

@Component({
    selector: 'reg-employer',
    templateUrl: './employer-register-form.component.html',
    styleUrls: ['./employer-register-form.component.css']
})

export class EmployerRegisterFormComponent implements OnInit {
    public registerEmployerForm: FormGroup;
    public employerRegModel: RegisterEmployerModel;
    public registerFail: boolean;

    constructor(
        private fb: FormBuilder,
        private authEmployerService: AuthenticationEmployerService,
        private router: Router
    ) {
        this.employerRegModel = new RegisterEmployerModel(true, "", "", "", "", "", "", "", "", "")
    }

    ngOnInit() {
        this.registerEmployerForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2)]],
            entityName: ['', [Validators.minLength(2), Validators.maxLength(50)]],
            sector: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern(new RegExp(phonePattern))]],
            email: ['', [Validators.required, Validators.pattern(new RegExp(mailPattern))]],
            website: [''],
            address: ['', [Validators.required]],
            logo: ['', [Validators.required]],
            passwords: this.fb.group({
                password: ['', [Validators.required]],
                confirmPassword: ['', [Validators.required]]
            }, {
                    validator: this.matchPasswords
                })
        })
    }

    registerEmployer(payload): void {
        let parsedPayload = payload.value;
        this.employerRegModel = {
            isEmployer: true,
            username: parsedPayload.username,
            password: parsedPayload.passwords['password'],
            entityName: parsedPayload.entityName,
            sector: parsedPayload.sector,
            phone: parsedPayload.phone,            
            email: parsedPayload.email,
            website: parsedPayload.website,
            address: parsedPayload.address,
            logo: parsedPayload.logo
        }

        this.employerRegModel['advetisements'] = [];

        this.authEmployerService.register(this.employerRegModel)
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
        // this.registeredEmployer = data['username'];
        this.router.navigate(['employers/login']);
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