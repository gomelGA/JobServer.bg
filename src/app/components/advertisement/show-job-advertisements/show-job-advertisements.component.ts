import { Component, OnInit } from '@angular/core';
import { ShowAdvertsService } from '../../../core/show-job-advertisements/show-adverts-actions.service';

@Component({
    selector: 'show-adverts',
    templateUrl: './show-job-advertisements.component.html',
    styleUrls: ['./show-job-advertisements.component.css']
})
export class ShowAllAdvertsComponent implements OnInit {
    public offers;
    public getAllAdvertsFail: boolean;

    constructor(
        private showAdvertsService: ShowAdvertsService
    ) {
        this.offers = [];
    }

    ngOnInit() {
        this.showAdvertsService.getAllAdverts()
            .subscribe(
            data => {
                Object.keys(data).map(k => {
                    let publishedDate = new Date(data[k]['_kmd']['ect']);
                    let formattedDate = this.convertDate(publishedDate);
                    data[k]['_kmd']['ect'] = formattedDate;
                })

                this.offers = data;
            },
            err => {
                this.getAllAdvertsFail = true;
            })
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