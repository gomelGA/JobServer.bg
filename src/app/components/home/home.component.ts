import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/home/home.service';
import { EmployerActionsService } from '../../core/employer-sector/employer/employer-actions.service';

@Component({
    selector: "home-component",
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    public getAllAdvertsFail: boolean;
    constructor(
        // private homeService: EmployerActionsService
    ) { }

    ngOnInit() { 
        // this.homeService.getLastFiveOffers()
        //     .subscribe(
        //     data => {
        //         console.log(data)
        //     },
        //     err => {
        //         this.getAllAdvertsFail = true;
        //     })
    }
}