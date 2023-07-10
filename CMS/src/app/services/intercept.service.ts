import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class InterceptService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const saveToken = request.url.split("/")[0] != "auth";

    if (saveToken) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          // 'Content-Type': 'application/json',
        },
      });
    }

    request = request.clone({ url: environment.serverUrl + `${request.url}` });

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          localStorage.removeItem("usuario");
          this.router.navigate(["auth"]);

          // location.reload();
        }

        const error = err.error || err.statusText;
        return throwError(error);
      })
    );
  }
}
