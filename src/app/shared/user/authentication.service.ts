import { SessionService } from './../session.service';
import { IUser } from './user.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<IUser>;
    public currentUser: Observable<IUser>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): IUser {
        return this.currentUserSubject.value;
    }

    login(loginname: string, password: string, groupid: string): Observable<any> {

        let user: IUser;
        return this.http.post<any>(`${environment.apiUrl}/api/v1/response/student/authenticate`, { loginname, password, groupid })
            .pipe(map(response => {
                try {
                    user = { ...response.payload.user };
                    user.token = response.payload.token;

                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                    }

                } catch (error) {
                    user = null;
                }
                return ({
                    status: response.status,
                    message: response.message,
                    payload: user
                });
            }));
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.clear();
        this.currentUserSubject.next(null);
    }
}
