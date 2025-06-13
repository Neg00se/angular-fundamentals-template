import { Course } from "@app/interfaces/course.interface";
import { Action, createReducer, on } from "@ngrx/store";
import {
  requestAllCourses,
  requestAllCoursesFail,
  requestAllCoursesSuccess,
  requestCreateCourse,
  requestCreateCourseFail,
  requestCreateCourseSuccess,
  requestDeleteCourse,
  requestDeleteCourseFail,
  requestDeleteCourseSuccess,
  requestEditCourse,
  requestEditCourseFail,
  requestEditCourseSuccess,
  requestFilteredCourses,
  requestFilteredCoursesFail,
  requestFilteredCoursesSuccess,
  requestSingleCourse,
  requestSingleCourseFail,
  requestSingleCourseSuccess,
} from "./courses.actions";

// Add your code here
export const coursesFeatureKey = "courses";

export interface CoursesState {
  // Add your code here
  allCourses: Course[] | null;
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  // Add your code here
  allCourses: null,
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),
  on(requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: false,
    course: course,
  })),
  on(requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(requestFilteredCourses, (state) => ({
    ...state,
    isSearchState: true,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),
  on(requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isSearchState: false,
    isAllCoursesLoading: false,
  })),
  on(requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isSearchState: false,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),
  on(requestDeleteCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(requestDeleteCourseSuccess, (state) => ({
    ...state,
    isSingleCourseLoading: false,
  })),
  on(requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(requestEditCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    allCourses:
      state.allCourses?.map((c) => (c.id === course.id ? course : c)) || [],
    isSingleCourseLoading: false,
  })),
  on(requestEditCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(requestCreateCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...(state.allCourses ?? []), course],
    isSingleCourseLoading: false,
  })),
  on(requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  }))
); // Add your code here

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
