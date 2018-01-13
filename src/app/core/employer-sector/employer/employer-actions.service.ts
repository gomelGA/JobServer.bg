import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//Models
import { PublishAdvertisementModel } from '../../../components/employer-sector/models/advertisements/publish-advertisement.model';

//Employer actions constants
import { employerConstants } from '../../../components/employer-sector/constants/employer-sector-constants';

@Injectable()
export class EmployerActionsService {

    constructor(
        private http: HttpClient
    ) {}

    publish(publishAdvertisementModel: PublishAdvertisementModel): Observable<Object> {
        return this.http.post(
            employerConstants.publishUrl,
            JSON.stringify(publishAdvertisementModel),
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    deleteAdvert(advertId) {
        return this.http.delete(
            employerConstants.deleteAdvertUrl + advertId,
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    private createAuthHeaders(type: string): HttpHeaders {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${employerConstants.appKey}:${employerConstants.appSecret}`)}`,
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