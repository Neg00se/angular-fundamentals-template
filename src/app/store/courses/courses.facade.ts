import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import {
  getAllCourses,
  getCourse,
  getCourses,
  getErrorMessage,
  isAllCoursesLoadingSelector,
  isSearchingStateSelector,
  isSingleCourseLoadingSelector,
} from "./courses.selectors";
import {
  requestAllCourses,
  requestCreateCourse,
  requestDeleteCourse,
  requestEditCourse,
  requestFilteredCourses,
  requestSingleCourse,
} from "./courses.actions";
import { WriteCourse } from "@app/interfaces/write-course.interface";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  // Add your code here
  constructor(private store: Store<CoursesState>) {}

  isAllCoursesLoading$ = this.store.select(isAllCoursesLoadingSelector);
  isSingleCourseLoading$ = this.store.select(isSingleCourseLoadingSelector);
  isSearchingState$ = this.store.select(isSearchingStateSelector);
  courses$ = this.store.select(getCourses);
  allCourses$ = this.store.select(getAllCourses);
  course$ = this.store.select(getCourse);
  errorMessage$ = this.store.select(getErrorMessage);

  getAllCourses() {
    this.store.dispatch(requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: WriteCourse, id: string) {
    this.store.dispatch(requestEditCourse({ id, course: body }));
  }

  createCourse(body: WriteCourse) {
    this.store.dispatch(requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(requestDeleteCourse({ id }));
  }
}
