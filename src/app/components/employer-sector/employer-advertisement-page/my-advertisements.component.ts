import { Component, OnInit } from '@angular/core';
import { ShowAdvertsService } from '../../../core/show-job-advertisements/show-adverts-actions.service';
import { Router } from '@angular/router';

@Component({
    selector: 'employer-adverts',
    templateUrl: './my-advertisements.component.html',
    styleUrls: ['./my-advertisements.component.css']
})

export class EmployerAdvertisementsComponent implements OnInit {
    extractedAdvertisements;
    public getAdvertsFail: boolean;
    public deleteAdvertFail: boolean;

    constructor(
        private showAdvertsService: ShowAdvertsService,
        private router: Router
    ) {
        this.extractedAdvertisements = [];
        this.getAdvertsFail = false;
        this.deleteAdvertFail = false;
    }

    ngOnInit() {
        // this.showAdvertsService.getAllByCreator(localStorage.getItem('creator'))
        // .subscribe(
        //     data => {
        //         console.log(data)
        //     }
        // )
        let myAdvertisements = localStorage.getItem('advertisements').split(',');
        myAdvertisements.map(i => this.showAdvertsService.getAdvertDetails(i)
            .subscribe(
            data => {
                let publishedDate = new Date(data['publishedDate']);
                data['publishedDate'] = this.convertDate(publishedDate)
                this.extractedAdvertisements.push(data);
            },
            err => {
                this.getAdvertsFail = true;
            }))
    }

    deleteAdvert(id) {
        this.showAdvertsService.deleteAdvert(id)
            .subscribe(
            data => {
            },
            err => {
                this.deleteAdvertFail = true;
            })

        this.router.navigate(['']);
    }

    private convertDate(date: Date) {
        let formattedDate: string;
        let day = date.getDate().toString();
        let month = date.getMonth().toString();
        let year = date.getFullYear().toString();

        if (Number(day) < 10) {
            day = '0' + day;
        }

        if (Number(month) < 10) {
            month = '0' + (Number(month) + 1);
        }

        formattedDate = day + '.' + month + '.' + year;

        return formattedDate;
    }
}