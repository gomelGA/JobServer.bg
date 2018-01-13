import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditAdvertisementModel } from '../../employer-sector/models/advertisements/edit-advertisement.model';
import { ShowAdvertsService } from '../../../core/show-job-advertisements/show-adverts-actions.service';
import { ActivatedRoute } from '@angular/router';
// import { AdminActionsService } from '../../../core/admin/admin-actions.service';

@Component({
    selector: 'admin-edit-advert',
    templateUrl: './admin-edit-advert.component.html',
    styleUrls: ['./admin-edit-advert.component.css']
})

export class AdminEditAdvertComponent implements OnInit {
    public advertId: string;
    public extractedAdvertData;
    public editAdvertisementForm: FormGroup;
    public editAdvertisementModel: EditAdvertisementModel;
    public editAdvertFail: boolean;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        // private adminService: AdminActionsService,
        private adminService: ShowAdvertsService
    ) {
        this.advertId = this.route.snapshot.params['id'];
        this.extractedAdvertData = '';
        this.editAdvertisementModel = new EditAdvertisementModel("", "", "", "", "", "", "", "", "");
    }

    ngOnInit() {
        this.adminService.getAdvertForEditById(this.advertId)
            .subscribe(
            data => {
                this.extractedAdvertData = data;
            },
            err => {
                this.editAdvertFail = true;
            })

        this.editAdvertisementForm = this.fb.group({
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

    editAdvertisement(payload): void {
        let parsedPayload = payload.value;
        this.editAdvertisementModel = {
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

        this.editAdvertisementModel['employer'] = this.extractedAdvertData['employer'];
        this.editAdvertisementModel['publishedDate'] = this.extractedAdvertData['publishedDate'];
        this.adminService.edit(this.advertId, this.editAdvertisementModel)
            .subscribe(
            data => {
            },
            err => {
                this.editAdvertFail = true;
            })
    }
}

