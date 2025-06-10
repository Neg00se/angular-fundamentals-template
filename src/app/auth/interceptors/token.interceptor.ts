import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { SessionStorageService } from "../services/session-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.sessionStorageService.getToken();
    if (token) {
      req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error("Unauthorized request, redirecting to login");
          this.sessionStorageService.deleteToken();
          this.router.navigate(["/login"]);
        }
        return throwError(() => error);
      })
    );
  }
}
