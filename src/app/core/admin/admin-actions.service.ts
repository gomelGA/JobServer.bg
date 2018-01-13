import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EditAdvertisementModel } from '../../components/employer-sector/models/advertisements/edit-advertisement.model';
import { adminConstants } from '../../components/admin/admin-constants';

@Injectable()
export class AdminActionsService {

    constructor(
        private http: HttpClient
    ) { }

    getAllAdverts(): Observable<Object> {
        return this.http.get(
            adminConstants.getAllAdvertsUrl,
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    edit(advertId: string, editAdvertisementModel: EditAdvertisementModel): Observable<Object> {
        return this.http.post(
            adminConstants.editAdvertUrl + advertId,
            JSON.stringify(editAdvertisementModel),
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    // getAdvertDetails(id: string): Observable<Object> {
    //     return this.http.get(
    //         showAdvertsConstants.getAdvertDetailsUrl + id,
    //         {
    //             headers: this.createAuthHeaders('Kinvey')
    //         }
    //     )
    // }

    // updateJobseekerApplications(userId, updatedUser): Observable<Object> {
    //     return this.http.put(
    //         showAdvertsConstants.getUpdateJobseekerApplicationsURL + userId,
    //         {
    //             'email': updatedUser['email'],
    //             'firstName': updatedUser['firstName'],
    //             'lastName': updatedUser['lastName'],
    //             'username': updatedUser['username'],
    //             'isEmployer': updatedUser['isEmployer'],
    //             "applications": updatedUser['applications']
    //         },
    //         {
    //             headers: {
    //                 'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //     )
    // }

    private createAuthHeaders(type: string): HttpHeaders {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${adminConstants.appKey}:${adminConstants.appSecret}`)}`,
                'Content-Type': 'application/json',
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`
            })
        }
    }
}