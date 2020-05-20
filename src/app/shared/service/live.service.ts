import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Live } from '../model/live.model';
import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({ providedIn: 'root' })
export class LiveService {

    apiUrl = 'http://localhost:8080/lives';

    constructor(
        private httpClient: HttpClient
    ) {}

    public getLives(): Observable<ResponsePageable> {
        return this.httpClient.get<ResponsePageable>(this.apiUrl);
    }

    public getLivesWithFlag(flag: string): Observable<ResponsePageable> {
        return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag);
    }

}
