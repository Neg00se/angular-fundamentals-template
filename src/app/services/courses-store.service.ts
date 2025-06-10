import { Injectable } from "@angular/core";
import { CoursesService } from "./courses.service";
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  of,
  tap,
  throwError,
} from "rxjs";
import { Course } from "@app/interfaces/course.interface";
import { WriteCourse } from "@app/interfaces/write-course.interface";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);

  isLoading$ = this.isLoading$$.asObservable();
  courses$ = this.courses$$.asObservable();

  constructor(private courseService: CoursesService) {}

  getAll() {
    this.isLoading$$.next(true);
    this.courseService
      .getAll()
      .pipe(
        map((response) => response.result || []),
        tap((courses) => this.courses$$.next(courses)),
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.error("Failed to fetch courses:", error);
          this.isLoading$$.next(false);
          return of([]);
        })
      )
      .subscribe();
  }

  createCourse(course: WriteCourse) {
    this.courseService
      .createCourse(course)
      .pipe(
        catchError((error) => {
          console.error("Failed to create course:", error);
          this.isLoading$$.next(false);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          console.log("Course created successfully");
          this.getAll(); // Refresh the course list after creation,
        },
      });
  }

  getCourse(id: string) {
    return this.courseService
      .getCourse(id)
      .pipe(map((response) => response.result));
  }

  editCourse(id: string, course: WriteCourse) {
    this.courseService
      .editCourse(id, course)
      .pipe(
        catchError((error) => {
          console.error("Failed to edit course:", error);
          this.isLoading$$.next(false);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          console.log("Course edited successfully");
          this.getAll(); // Refresh the course list after editing
        },
      });
  }

  deleteCourse(id: string) {
    this.courseService
      .deleteCourse(id)
      .pipe(
        catchError((error) => {
          console.error("Failed to delete course:", error);
          this.isLoading$$.next(false);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          console.log("Course deleted successfully");
          this.getAll(); // Refresh the course list after deletion
        },
      });
  }

  filterCourses(value: string) {
    this.isLoading$$.next(true);

    this.courseService
      .filterCourses(value)
      .pipe(
        map((response) => response.result),
        tap((courses) => this.courses$$.next(courses)),
        finalize(() => this.isLoading$$.next(false)),
        catchError((error) => {
          console.error("Failed to filter courses:", error);
          this.isLoading$$.next(false);
          return of([]);
        })
      )
      .subscribe();
  }

  getAllAuthors() {
    return this.courseService
      .getAllAuthors()
      .pipe(map((response) => response.result || []));
  }

  createAuthor(name: string) {
    return this.courseService.createAuthor(name);
  }

  getAuthorById(id: string) {
    return this.courseService
      .getAuthorById(id)
      .pipe(map((response) => response.result));
  }
}
