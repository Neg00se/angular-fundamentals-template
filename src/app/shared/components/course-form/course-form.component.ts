import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm: FormGroup = this.fb.group({
    title: ["", [Validators.minLength(2), Validators.required]],
    description: ["", [Validators.minLength(2), Validators.required]],
    author: ["", Validators.pattern(/^[a-zA-Z0-9\s]*$/)],
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
