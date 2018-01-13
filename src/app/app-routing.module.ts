import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LogoutComponent } from "./components/authentication/logout/logout.component";
import { ShowAllAdvertsComponent } from "./components/advertisement/show-job-advertisements/show-job-advertisements.component";

const routes: Routes = [
    { path: '', component: ShowAllAdvertsComponent },
    { path: 'jobseekers', loadChildren: './components/authentication/auth.module#AuthModule' },
    { path: 'employers', loadChildren: './components/authentication/auth.module#AuthModule' },
    { path: 'logout', component: LogoutComponent },
    { path: 'employer', loadChildren: './components/employer-sector/employer.module#EmployerModule' },
    { path: 'offers', loadChildren: './components/advertisement/show-adverts.module#ShowAdvertsModule'},    
    { path: 'jobseeker', loadChildren: './components/jobseeker-sector/jobseeker.module#JobseekerModule' },
    { path: 'admin', loadChildren: './components/admin/admin.module#AdminModule' }    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }