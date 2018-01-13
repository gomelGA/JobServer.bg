import { Component, OnInit } from '@angular/core';
// import { AdminService } from '../../../core/admin/admin.service';
import { ShowAdvertsService } from '../../../core/show-job-advertisements/show-adverts-actions.service';

@Component({
    selector: 'admin-all-adverts',
    templateUrl: './show-all-adverts.component.html',
    styleUrls: ['./show-all-adverts.component.css']
})
export class AdminAllAdvertsComponent implements OnInit {
    public offers;
    public getAllAdvertsFail: boolean;
    public deleteAdvertFail;

    constructor(
        // private adminService: AdminService,
        private adminService: ShowAdvertsService
    ) {
        this.offers = [];
    }

    ngOnInit() {
        this.adminService.getAllAdverts()
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

    deleteAdvert(id) {
        this.adminService.deleteAdvert(id)
            .subscribe(
            data => {
            },
            err => {
                this.deleteAdvertFail = true;
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