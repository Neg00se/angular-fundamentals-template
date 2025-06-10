import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { AppComponent } from "@app/app.component";
import { CourseInfoComponent } from "@features/course-info/course-info.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesService } from "@app/services/courses.service";
import { RouterModule } from "@angular/router";
import { routes } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { ButtonComponent } from "./shared/components";

@NgModule({
  declarations: [AppComponent, CourseInfoComponent],
  imports: [
    ButtonComponent,
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
