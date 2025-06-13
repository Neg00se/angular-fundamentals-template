import { Injectable } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesStateFacade } from "./courses.facade";
import { Router } from "@angular/router";
import {
  requestAllCourses,
  requestAllCoursesFail,
  requestAllCoursesSuccess,
  requestCreateCourse,
  requestCreateCourseFail,
  requestCreateCourseSuccess,
  requestDeleteCourse,
  requestDeleteCourseFail,
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
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

  // Add your code here
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((response) =>
            requestAllCoursesSuccess({ courses: response.result })
          ),
          catchError((error) => of(requestAllCoursesFail({ error: error })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestFilteredCourses),
      withLatestFrom(this.coursesStateFacade.allCourses$),
      map(([action, allCourses]) => {
        const filteredCourses = allCourses.filter((course) =>
          course.title.toLowerCase().includes(action.title.toLowerCase())
        );
        return requestFilteredCoursesSuccess({ courses: filteredCourses });
      }),
      catchError((error) => of(requestFilteredCoursesFail({ error })))
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSingleCourse),
      mergeMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map((response) =>
            requestSingleCourseSuccess({ course: response.result })
          ),
          catchError((error) => of(requestSingleCourseFail({ error })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestDeleteCourse),
      mergeMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => requestAllCourses()),
          catchError((error) => of(requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestEditCourse),
      mergeMap(({ id, course }) =>
        this.coursesService.editCourse(id, course).pipe(
          map((updatedCourse) =>
            requestEditCourseSuccess({ course: updatedCourse })
          ),
          catchError((error) => of(requestEditCourseFail({ error })))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourse),
      mergeMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map((newCourse) => requestCreateCourseSuccess({ course: newCourse })),
          catchError((error) => of(requestCreateCourseFail({ error })))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          requestCreateCourseSuccess,
          requestEditCourseSuccess,
          requestSingleCourseFail
        ),
        map(() => {
          this.router.navigate(["/courses"]);
        })
      ),
    { dispatch: false }
  );
}
