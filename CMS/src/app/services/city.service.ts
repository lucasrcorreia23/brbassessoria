import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  get(filtros: any): Observable<any> {
    return this.http.get(`cidade/list`, {
      params: filtros,
    });
  }

  getByEstado(filtros: any, estado: any): Observable<any> {
    return this.http.get(`estado/${estado}`, {
      params: filtros,
    });
  }
}
