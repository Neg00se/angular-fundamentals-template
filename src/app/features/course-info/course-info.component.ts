import { Component, Input } from "@angular/core";
import { ButtonComponent } from "@app/shared/components";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
  standalone: true,
  imports: [ButtonComponent],
})
export class CourseInfoComponent {
  @Input() title: string = "Title";
  @Input() description: string = "Description of the course";
  @Input() id: string = "course-id";
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0; // in minutes
  @Input() authors: string[] = []; // Array of author names
}
