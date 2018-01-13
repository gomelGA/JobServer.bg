import { Routes } from "@angular/router";
import { JobseekerCommonInfoComponent } from "./common-info-page/common-info.component";
import { MyApplicationsComponent } from "./jobseeker-applications-page/my-applications.component";
import { AuthJobseekerGuard } from "../../core/guards/authentication/auth-jobseeker.guard";

export const jobseekerRoutes: Routes = [
    { path: 'common', component: JobseekerCommonInfoComponent },
    { path: 'myApplications', canActivate: [AuthJobseekerGuard], component: MyApplicationsComponent }
]