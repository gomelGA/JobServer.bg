import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { showAdvertsConstants } from '../../../components/advertisement/constants/show-advertisements-constants';

@Injectable()
export class JobseekerActionService {

    constructor(
        private http: HttpClient
    ) { }

    getAdvertisement(id) {
        return this.http.get(
            showAdvertsConstants.getAdvertDetailsUrl + id,
            {
                headers: this.createAuthHeaders('Kinvey')
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
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`
            })
        }
    }
}