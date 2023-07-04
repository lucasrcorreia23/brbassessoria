import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../../../models/user.model";

@Injectable()
export class AuthService {
  usuario: User;
  token: string;

  constructor(private http: HttpClient) {
    this.usuario = new User().deserialize(
      JSON.parse(localStorage.getItem("usuario")!)
    );
    this.token = localStorage.getItem("token")!;
  }

  // Authentication/Authorization
  login(login: string, password: string): Observable<void> {
    return this.http
      .post<User>("login", {
        usuario: login,
        senha: password,
      })
      .pipe(
        map((res: any) => {
          this.usuario = new User().deserialize(res.usuario);
          this.token = res.token;

          localStorage.setItem("token", res.token);
          localStorage.setItem("usuario", JSON.stringify(res.usuario));
          localStorage.setItem("login", login);
        })
      );
  }
}
