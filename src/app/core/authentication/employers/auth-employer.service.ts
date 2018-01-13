import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//Models
import { RegisterEmployerModel } from '../../../components/authentication/models/employers/register-employer.model';
import { LoginEmployerModel } from '../../../components/authentication/models/employers/login-employer.model';

//Authentication constants
import { authConstants } from './../../../components/authentication/auth-constants';
import { authComponents } from '../../../components/authentication/index';

@Injectable()
export class AuthenticationEmployerService {

    @Output() isUserLogged: EventEmitter<any> = new EventEmitter();

    private currentAuthtoken: string;

    constructor(
        private http: HttpClient
    ) { }

    register(registerEmployerModel: RegisterEmployerModel): Observable<Object> {
        return this.http.post(
            authConstants.registerUrl,
            JSON.stringify(registerEmployerModel),
            {
                headers: this.createAuthHeaders('Basic')
            }
        )
    }

    login(loginModel : LoginEmployerModel) {
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
                'Content-Type': 'application/json',
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        }
    }
}