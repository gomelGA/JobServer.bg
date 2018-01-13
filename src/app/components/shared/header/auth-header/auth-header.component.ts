import { Component, OnInit } from '@angular/core';
import { AuthenticationJobseekerService } from './../../../../core/authentication/jobseekers/auth-jobseeker.service';
import { AuthenticationEmployerService } from '../../../../core/authentication/employers/auth-employer.service';

@Component({
  selector: 'auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  user: string;
  isLogged: boolean;
  isAdmin: boolean;
  constructor(
    private authJobseekerService: AuthenticationJobseekerService,
    private authEmployerService: AuthenticationEmployerService
  ) {
    this.authJobseekerService.isUserLogged.subscribe(v => this.isUserLogged(v));
    this.authEmployerService.isUserLogged.subscribe(v => this.isUserLogged(v));
  }

  ngOnInit() {
  }

  isUserLogged(userLogged: boolean) {
    this.isLogged = userLogged;
    if (userLogged) {
      this.user = localStorage.getItem('user');
      this.isAdmin = localStorage.getItem('isAdmin') === "true" ? true : false;
    }
  }
}
