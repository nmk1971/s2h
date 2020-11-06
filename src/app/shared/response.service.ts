import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from './helpers/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private http: HttpClient) { }

  postResponse(response: any): Observable<IApiResponse> {
    const url = `${environment.apiUrl}/api/v1/response/session/finalresponse`;
    return this.http.post(url, response) as Observable<IApiResponse>;
  }
}
