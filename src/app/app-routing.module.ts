import { Routes } from "@angular/router";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AdminGuard } from "./user/guards/admin.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "courses",
    pathMatch: "full",
  },
  {
    path: "login",
    canActivate: [NotAuthorizedGuard],
    loadComponent: () =>
      import("./shared/components/login-form/login-form.component").then(
        (m) => m.LoginFormComponent
      ),
  },
  {
    path: "registration",
    canActivate: [NotAuthorizedGuard],
    loadComponent: () =>
      import(
        "./shared/components/registration-form/registration-form.component"
      ).then((m) => m.RegistrationFormComponent),
  },

  {
    path: "courses/add",
    canLoad: [AuthorizedGuard, AdminGuard],
    loadComponent: () =>
      import("./shared/components/course-form/course-form.component").then(
        (m) => m.CourseFormComponent
      ),
  },
  {
    path: "courses/edit/:id",
    canLoad: [AuthorizedGuard, AdminGuard],
    loadComponent: () =>
      import("./shared/components/course-form/course-form.component").then(
        (m) => m.CourseFormComponent
      ),
  },
  {
    path: "courses/:id",
    canLoad: [AuthorizedGuard],
    loadComponent: () =>
      import("./features/course-info/course-info.component").then(
        (m) => m.CourseInfoComponent
      ),
  },
  {
    path: "courses",
    canLoad: [AuthorizedGuard],
    loadComponent: () =>
      import("./features/courses-list/courses-list.component").then(
        (m) => m.CoursesListComponent
      ),
  },
  {
    path: "**",
    redirectTo: "courses",
    pathMatch: "full",
  },
];
