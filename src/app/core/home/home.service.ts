import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { showAdvertsConstants } from '../../components/advertisement/constants/show-advertisements-constants';

@Injectable()
export class HomeService {

    constructor(
        private http: HttpClient
    ) { }

    getLastFiveOffers(): Observable<Object> {
        return this.http.get(
            showAdvertsConstants.getAllAdvertsUrl,
            {
                headers: {
                    'Authorization': `Basic ${btoa(`${showAdvertsConstants.appKey}:${showAdvertsConstants.appSecret}`)}`
                }
            }
        )
    }

    private createAuthHeaders(type: string): HttpHeaders {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${showAdvertsConstants.appKey}:${showAdvertsConstants.appSecret}`)}`,
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