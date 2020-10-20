import { environment } from './../../environments/environment';
import { IApiResponse } from './helpers/api-response.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


/*
* This survice assure the first connection to api
*/

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  connect(code: string): Observable<IApiResponse>{
      return this.http.get(`${environment.apiUrl}/api/v1/response/sessionbycode/${code}`) as  Observable<IApiResponse> ;
  }
}
