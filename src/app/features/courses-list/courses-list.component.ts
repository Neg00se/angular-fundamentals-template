import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Course } from "@app/interfaces/course.interface";
import {
  ButtonComponent,
  CourseCardComponent,
  InfoComponent,
} from "@app/shared/components";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Observable } from "rxjs";

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
export class CoursesListComponent implements OnInit {
  courses$!: Observable<Course[]>;
  isLoading$!: Observable<boolean>;

  constructor(
    private userStore: UserStoreService,
    private coursesFacade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();

    this.courses$ = this.coursesFacade.allCourses$;
    this.isLoading$ = this.coursesFacade.isAllCoursesLoading$;
  }

  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  get isAdmin() {
    return this.userStore.isAdmin;
  }
}
