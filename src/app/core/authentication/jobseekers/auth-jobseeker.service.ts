import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//Models
import { RegisterJobseekerModel } from './../../../components/authentication/models/jobseekers/register-jobseeker.model';
import { LoginModel } from '../../../components/authentication/models/jobseekers/login-jobseeker.model';

//Authentication constants
import { authConstants } from './../../../components/authentication/auth-constants';

@Injectable()
export class AuthenticationJobseekerService {

    @Output() isUserLogged: EventEmitter<any> = new EventEmitter<boolean>();

    private currentAuthtoken: string;

    constructor(
        private http: HttpClient
    ) { }

    register(registerJobSeekerModel: RegisterJobseekerModel): Observable<Object> {
        return this.http.post(
            authConstants.registerUrl,
            JSON.stringify(registerJobSeekerModel),
            {
                headers: this.createAuthHeaders('Basic')
            }
        )
    }

    login(loginModel: LoginModel): Observable<Object> {
        return this.http.post(
            authConstants.loginUrl,
            JSON.stringify(loginModel),
            {
                headers: this.createAuthHeaders('Basic')
            }
        )
    }


    logout(): Observable<Object> {
        return this.http.post(
            authConstants.logoutUrl,
            {},
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )        
    }

    get authtoken() {
        return this.currentAuthtoken;
    }

    set authtoken(value: string) {
        this.currentAuthtoken = value;
    }

    isAuthed(): boolean {
        return localStorage.getItem('authtoken') !== null;
    }

    private createAuthHeaders(type: string): HttpHeaders {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${authConstants.appKey}:${authConstants.appSecret}`)}`,
                'Content-Type': 'application/json'
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        }
    }
}