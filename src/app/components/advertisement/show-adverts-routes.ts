import { Routes } from "@angular/router";
import { ShowAllAdvertsComponent } from "./show-job-advertisements/show-job-advertisements.component";
import { AdvertDetailsComponent } from "./advertDetails/show-advert-details.component";

export const showAdvertsRoutes: Routes = [
    { path: 'search', component: ShowAllAdvertsComponent },
    { path: ':id', component: AdvertDetailsComponent }
]