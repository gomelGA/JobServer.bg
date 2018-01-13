import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PublishAdvertisementModel } from '../../employer-sector/models/advertisements/publish-advertisement.model';

import { EmployerActionsService } from '../../../core/employer-sector/employer/employer-actions.service';
import { Router } from '@angular/router';

@Component({
    selector: 'create-adv',
    templateUrl: './create-job-advertisement.component.html',
    styleUrls: ['./create-job-advertisement.component.css']
})

export class CreateAdvertisementComponent implements OnInit {
    public publishAdvertisementForm: FormGroup;
    public publishAdvertisementModel: PublishAdvertisementModel;
    public publishAdvertFail: boolean;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private employerActionsService: EmployerActionsService
    ) {
        this.publishAdvertisementModel = new PublishAdvertisementModel("", "", "", "", "", "", "", "", "");
    }

    ngOnInit() {
        this.publishAdvertisementForm = this.fb.group({
            shortPreview: ['', [Validators.minLength(2), Validators.maxLength(1500)]],
            jobTitle: ['', [Validators.minLength(2), Validators.maxLength(150)]],
            refNumber: [''],
            mainResponsibilities: ['', [Validators.minLength(2), Validators.maxLength(3500)]],
            requirements: ['', [Validators.minLength(2), Validators.maxLength(3500)]],
            sector: ['', [Validators.required]],
            employmentType: ['', [Validators.required]],
            hierarchyLevel: ['', [Validators.required]],
            place: ['', [Validators.required]],
        })
    }

    publishAdvertisement(payload): void {
        let parsedPayload = payload.value;
        this.publishAdvertisementModel = {
            shortPreview: parsedPayload.shortPreview,
            jobTitle: parsedPayload.jobTitle,
            refNumber: parsedPayload.refNumber,
            mainResponsibilities: parsedPayload.mainResponsibilities,
            requirements: parsedPayload.requirements,
            sector: parsedPayload.sector,
            employmentType: parsedPayload.employmentType,
            hierarchyLevel: parsedPayload.hierarchyLevel,
            place: parsedPayload.place
        }

        this.publishAdvertisementModel['employer'] = localStorage.getItem('username');

        this.employerActionsService.publish(this.publishAdvertisementModel)
            .subscribe(
            data => {
            },
            err => {
                this.publishAdvertFail = true;
            })

        this.router.navigate(['']);
    }
}