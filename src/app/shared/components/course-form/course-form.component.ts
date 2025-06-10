import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent } from "../button/button.component";
import { DurationPipe } from "@app/shared/pipes/duration.pipe";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, DurationPipe, CommonModule],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm: FormGroup = this.fb.group({
    title: ["", [Validators.minLength(2), Validators.required]],
    description: ["", [Validators.minLength(2), Validators.required]],
    author: [
      "",
      [Validators.pattern(/^[a-zA-Z0-9\s]*$/), Validators.minLength(2)],
    ],
    authors: this.fb.array([this.fb.control({ value: "", disabled: true })]),
    duration: [0, [Validators.required, Validators.min(0)]],
  });
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  get authors() {
    return this.courseForm.get("authors") as FormArray;
  }

  get author() {
    return this.courseForm.get("author");
  }

  get title() {
    return this.courseForm.get("title");
  }

  get description() {
    return this.courseForm.get("description");
  }

  get duration() {
    return this.courseForm.get("duration");
  }

  addAuthor() {
    this.authors.push(this.author);
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }
}
