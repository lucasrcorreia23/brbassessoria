import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalityService {
  constructor(private http: HttpClient) {}

  getCorreios(cep: string): Observable<any> {
    return this.http.get('locality/cep', {
      params: {
        cep,
      },
    });
  }
}
