import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "@app/interfaces/course.interface";
import { WriteCourse } from "@app/interfaces/write-course.interface";
import { baseUrl } from "@app/shared/api.constants";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<GetAllCoursesResponse>(baseUrl + "/courses/all");
  }

  createCourse(course: WriteCourse) {
    return this.http.post<Course>(baseUrl + "/courses/add", course);
  }

  editCourse(id: string, course: WriteCourse) {
    return this.http.put<Course>(baseUrl + "/courses/" + id, course);
  }

  getCourse(id: string) {
    return this.http.get<GetCourseResponse>(baseUrl + "/courses/" + id);
  }

  deleteCourse(id: string) {
    return this.http.delete(baseUrl + "/courses/" + id);
  }

  filterCourses(value: string) {
    const params = new HttpParams({
      fromString: value,
    });

    return this.http.get<GetAllCoursesResponse>(baseUrl + "/courses/filter", {
      params,
    });
  }

  getAllAuthors() {
    return this.http.get<GetAllAuthorsResponse>(baseUrl + "/authors/all");
  }

  createAuthor(name: string) {
    return this.http.post(baseUrl + "/authors/add", { name });
  }

  getAuthorById(id: string) {
    return this.http.get<GetAuthorResponse>(baseUrl + "/authors/" + id);
  }
}

interface GetAllCoursesResponse {
  success: boolean;
  result: Course[];
}

interface GetCourseResponse {
  success: boolean;
  result: Course;
}

interface GetAllAuthorsResponse {
  success: boolean;
  result: Author[];
}

interface GetAuthorResponse {
  success: boolean;
  result: Author;
}

interface Author {
  name: string;
  id: string;
}
