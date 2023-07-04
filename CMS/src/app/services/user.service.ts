import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  change(data: {
    current: string;
    new: string;
    confirm: string;
  }): Observable<void> {
    return this.http.post<void>("user/changePassword", data);
  }

  get(filtros: any): Observable<any> {
    return this.http.get("user", {
      params: filtros,
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get("user/" + id);
  }

  add(dados: any): Observable<any> {
    return this.http.post("user", dados);
  }

  edit(dados: any): Observable<any> {
    return this.http.put("user", dados);
  }

  excluir(id: any): Observable<any> {
    return this.http.delete("user/" + id);
  }
}
