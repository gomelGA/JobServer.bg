import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { showAdvertsConstants } from '../../components/advertisement/constants/show-advertisements-constants';
import { adminConstants } from '../../components/admin/admin-constants';
import { Observable } from 'rxjs/Observable';
import { EditAdvertisementModel } from '../../components/employer-sector/models/advertisements/edit-advertisement.model';

@Injectable()
export class ShowAdvertsService {

    constructor(
        private http: HttpClient
    ) { }

    getAllAdverts(): Observable<Object> {
        return this.http.get(
            showAdvertsConstants.getAllAdvertsUrl,
            {
                headers: {
                    'Authorization': 'Basic ' + `${btoa('guest:guest')}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    getAdvertDetails(id: string): Observable<Object> {
        return this.http.get(
            adminConstants.editAdvertUrl + id,
            {
                // headers: this.createAuthHeaders('Kinvey')
                headers: {
                    'Authorization': 'Basic ' + `${btoa('guest:guest')}`
                }
            }
        )
    }

    getAllByCreator(creatorId: string): Observable<Object> {
        return this.http.get(
            showAdvertsConstants.getAllByCreatorUrl + `{"_acl.creator":` + `${creatorId}` + `}`,
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    updateJobseekerApplications(userId, updatedUser): Observable<Object> {
        return this.http.put(
            showAdvertsConstants.getUpdateJobseekerApplicationsURL + userId,
            {
                'email': updatedUser['email'],
                'firstName': updatedUser['firstName'],
                'lastName': updatedUser['lastName'],
                'username': updatedUser['username'],
                'isEmployer': updatedUser['isEmployer'],
                "applications": updatedUser['applications']
            },
            {
                headers: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    //Admin actions
    adminGetAllAdverts(): Observable<Object> {
        return this.http.get(
            adminConstants.getAllAdvertsUrl,
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    getAdvertForEditById(id: string) {
        return this.http.get(
            adminConstants.editAdvertUrl + id,
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    edit(advertId: string, updatedAdvert: EditAdvertisementModel): Observable<Object> {
        return this.http.put(
            adminConstants.editAdvertUrl + advertId,
            {
                'shortPreview': updatedAdvert['shortPreview'],
                'jobTitle': updatedAdvert['jobTitle'],
                'refNumber': updatedAdvert['refNumber'],
                'mainResponsibilities': updatedAdvert['mainResponsibilities'],
                'requirements': updatedAdvert['requirements'],
                'sector': updatedAdvert['sector'],
                "employmentType": updatedAdvert['employmentType'],
                "hierarchyLevel": updatedAdvert['hierarchyLevel'],
                "place": updatedAdvert['place'],
                "employer": updatedAdvert['employer'],
                "publishedDate": updatedAdvert['publishedDate']
            },
            {
                headers: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    }

    deleteAdvert(advertId) {
        return this.http.delete(
            adminConstants.deleteAdvertUrl + advertId,
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