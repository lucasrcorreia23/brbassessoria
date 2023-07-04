import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Client } from "../models/client.model";

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  get(filtros: any): Observable<any> {
    return this.http.get("client", {
      params: filtros,
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get("client/" + id);
  }

  add(dados: any): Observable<any> {
    return this.http.post("client", dados);
  }

  edit(dados: any): Observable<any> {
    return this.http.put("client", dados);
  }

  getEnums(): Observable<any> {
    return this.http.get("client/enums");
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>("client/all");
  }

  excel(filtros: any): Observable<any> {
    return this.http.get("client/excel", {
      params: filtros,
      responseType: "blob",
    });
  }

  getDashboard(type: number): Observable<Client[]> {
    return this.http.get<Client[]>("client/dashboard", {
      params: { type },
    });
  }
}
