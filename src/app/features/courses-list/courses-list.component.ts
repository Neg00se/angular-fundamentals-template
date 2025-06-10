import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  ButtonComponent,
  CourseCardComponent,
  InfoComponent,
} from "@app/shared/components";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
  standalone: true,
  imports: [
    CourseCardComponent,
    ButtonComponent,
    CommonModule,
    InfoComponent,
    ButtonComponent,
    RouterLink,
  ],
})
export class CoursesListComponent {
  constructor(private userStore: UserStoreService) {}

  @Input() courses: {
    title: string;
    description: string;
    duration: number;
    creationDate: string;
    authors: string[];
  }[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  get isAdmin() {
    return this.userStore.isAdmin;
  }
}
