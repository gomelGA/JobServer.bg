import { Routes } from "@angular/router";
import { EmployerCommonInfoComponent } from "./common-info-page/common-info.component";
import { CreateAdvertisementComponent } from "./create-job-advertisement/create-job-advertisement.component";
import { EmployerAdvertisementsComponent } from "./employer-advertisement-page/my-advertisements.component";
import { AuthEmployerGuard } from "../../core/guards/authentication/auth-employer.guard";

export const employerRoutes: Routes = [
    { path: 'common', component: EmployerCommonInfoComponent },
    { path: 'createAdv', canActivate: [AuthEmployerGuard], component: CreateAdvertisementComponent },
    { path: 'myAdvertisements', canActivate: [AuthEmployerGuard], component: EmployerAdvertisementsComponent }    
]