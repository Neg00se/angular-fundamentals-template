import { Component, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule, RouterLink],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({ email: this.email, password: this.password });
  }
}
