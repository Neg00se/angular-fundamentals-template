import { Component, EventEmitter, Input, Output } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mocks";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  @Input() courses = mockedCoursesList;
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();
}
