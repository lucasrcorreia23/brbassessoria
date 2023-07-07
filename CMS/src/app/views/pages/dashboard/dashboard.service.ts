import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get("site");
  }
}
