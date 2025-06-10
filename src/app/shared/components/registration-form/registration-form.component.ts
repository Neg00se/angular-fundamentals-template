import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule, RouterLink],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });
  // Use the names `name`, `email`, `password` for the form controls.

  get email() {
    return this.registrationForm.get("email");
  }

  get password() {
    return this.registrationForm.get("password");
  }

  get name() {
    return this.registrationForm.get("name");
  }
}
