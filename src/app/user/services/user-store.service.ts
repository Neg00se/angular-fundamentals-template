import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, of, tap } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  private name$$ = new BehaviorSubject<string>("");

  isAdmin$ = this.isAdmin$$.asObservable();
  name$ = this.name$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    return this.userService
      .getUser()
      .pipe(
        map((response) => response.result),
        tap((user) => {
          this.name$$.next(user.name);
          this.isAdmin = user.role === "admin";
        }),
        catchError((error) => {
          console.error("Error fetching user data:", error);
          return of(null);
        })
      )
      .subscribe();
  }

  get isAdmin() {
    // Add your code here. Get isAdmin$$ value
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
    this.isAdmin$$.next(value);
  }
}
