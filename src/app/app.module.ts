//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AuthModule } from './components/authentication/auth.module';
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployerModule } from './components/employer-sector/employer.module';
import { ShowAdvertsModule } from './components/advertisement/show-adverts.module';
import { JobseekerModule } from './components/jobseeker-sector/jobseeker.module';
import { GuardsModule } from './core/guards/guards.module';
import { AdminModule } from './components/admin/admin.module';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

//Services
import { AuthenticationJobseekerService } from './core/authentication/jobseekers/auth-jobseeker.service';
import { AuthenticationEmployerService } from './core/authentication/employers/auth-employer.service';
import { EmployerActionsService } from './core/employer-sector/employer/employer-actions.service';
import { ShowAdvertsService } from './core/show-job-advertisements/show-adverts-actions.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    EmployerModule,
    ShowAdvertsModule,
    JobseekerModule,
    GuardsModule,
    AdminModule
  ],
  providers: [
    AuthenticationJobseekerService,
    AuthenticationEmployerService,
    EmployerActionsService,
    ShowAdvertsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
