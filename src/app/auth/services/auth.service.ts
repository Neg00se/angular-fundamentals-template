import { Injectable } from "@angular/core";
import { SessionStorageService } from "./session-storage.service";
import { LoginRequest } from "../interfaces/login-interface";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "@app/shared/api.constants";
import { RegistrationRequest } from "../interfaces/registration-interface";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  constructor(
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  login(user: LoginRequest) {
    this.http.post<{ result: string }>(baseUrl + "/login", user).subscribe({
      next: (response) => {
        this.sessionStorage.setToken(response.result);
        this.isAuthorised = true;
        this.router.navigate([""]);
      },
    });
  }

  logout() {
    this.http
      .delete(baseUrl + "/logout", {
        headers: {
          Authorization: this.sessionStorage.getToken() || "",
        },
      })
      .subscribe(() => {
        this.sessionStorage.deleteToken();
      });
  }

  register(user: RegistrationRequest) {
    this.http
      .post<{ successfull: boolean; result: string }>(
        baseUrl + "/register",
        user
      )
      .subscribe((response) => {
        if (response.successfull) {
          console.log(response.result);
        } else {
          console.error("Registration failed");
        }
      });
  }

  get isAuthorised() {
    // Add your code here. Get isAuthorized$$ value

    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
    return baseUrl + "/login";
  }
}
