import { Component, OnInit } from '@angular/core';
import { ShowAdvertsService } from '../../../core/show-job-advertisements/show-adverts-actions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'advert-details',
    templateUrl: './show-advert-details.component.html',
    styleUrls: ['./show-advert-details.component.css']
})
export class AdvertDetailsComponent implements OnInit {
    public advertId: string;
    public getAdvertDetailsFail: boolean;
    public extractedAdvertDetails;
    public isAdvertCreator: boolean;
    public isUserEmployer: boolean;
    public isApplied: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private showAdvertsService: ShowAdvertsService
    ) {
        this.advertId = this.route.snapshot.params['id'];
        this.extractedAdvertDetails = {};
        this.getAdvertDetailsFail = false;
        this.isAdvertCreator = false;
        this.isUserEmployer = false;
        this.isApplied = false;
    }

    ngOnInit() {
        this.showAdvertsService.getAdvertDetails(this.advertId)
            .subscribe(
            data => {
                this.extractedAdvertDetails = data;
                this.extractedAdvertDetails['mainResponsibilities'] =
                    this.splitData(this.extractedAdvertDetails.mainResponsibilities);
                this.extractedAdvertDetails['requirements'] =
                    this.splitData(this.extractedAdvertDetails.requirements);
                let publishedDate = new Date(data['_kmd']['ect']);
                let formattedDate = this.convertDate(publishedDate);
                this.extractedAdvertDetails['formattedDate'] = formattedDate;
                this.isAdvertCreator = this.extractedAdvertDetails['_acl']['creator'] === localStorage.getItem('creator') ? true : false;
                this.isUserEmployer = localStorage.getItem('isEmployer') === "true" ? true : false;
            },
            err => {
                this.getAdvertDetailsFail = true;
            })
    }

    apply() {
        if (!localStorage.getItem('authtoken')) {
            this.router.navigate(['/login']);
            return;
        }

        let userApplications;
        if (localStorage.getItem('advertisements') !== "") {
            userApplications = localStorage.getItem('advertisements').split(',');
            if (userApplications.includes(this.advertId)) {
                this.isApplied = true;
                return
            }
        } else {
            userApplications = [];
        }

        userApplications.push(this.advertId);
        localStorage.setItem('advertisements', userApplications.toString());
        let updatedUser = {
           email: localStorage.getItem('email'), 
           firstName:localStorage.getItem('firstName'),
           lastName: localStorage.getItem('lastName'),
           username: localStorage.getItem('username'),
           isEmployer: false,
           applications: localStorage.getItem('applications').split(',')
        };
        this.showAdvertsService.updateJobseekerApplications(localStorage.getItem('creator'), updatedUser)
        .subscribe(
            data => {},
            err => {
                this.getAdvertDetailsFail = true;
            });

            this.router.navigate[''];
    }

    private splitData(data: string) {
        return data.split('\n');
    }

    private convertDate(date: Date) {
        let formatedDate: string;
        let day = date.getDate().toString();
        let month = date.getMonth().toString();
        let year = date.getFullYear().toString();

        if (Number(day) < 10) {
            day = '0' + day;
        }

        if (Number(month) < 10) {
            month = '0' + (Number(month) + 1);
        }

        formatedDate = day + '.' + month + '.' + year;

        return formatedDate;
    }
}
