import { Component, OnInit } from '@angular/core';
import { ShowAdvertsService } from '../../../core/show-job-advertisements/show-adverts-actions.service';

@Component({
    selector: 'my-applications',
    templateUrl: './my-applications.components.html',
    styleUrls: ['./my-applications.component.css']
})

export class MyApplicationsComponent implements OnInit {
    extractedApplications;
    public getAdvertsFail: boolean;
    constructor(
        private showAdvertsService: ShowAdvertsService
    ) {
        this.extractedApplications = [];
        this.getAdvertsFail = false;
     }

    ngOnInit() {
        let myApplications = localStorage.getItem('advertisements').split(',');
        myApplications.map(i => this.showAdvertsService.getAdvertDetails(i)
        .subscribe(
        data => {
            this.extractedApplications.push(data);
        },
        err => {
            this.getAdvertsFail = true;
        }))   
    }
}