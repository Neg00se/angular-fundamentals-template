import { Component } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  constructor(private authService: AuthService, private router: Router) {}

  buttonText: string = this.authService.isAuthorised ? "Logout" : "Login";

  get isAuthorized() {
    return this.authService.isAuthorised;
  }

  logout() {
    if (this.isAuthorized) {
      this.authService.logout();
      this.router.navigate(["/login"]);
    }
  }
}
