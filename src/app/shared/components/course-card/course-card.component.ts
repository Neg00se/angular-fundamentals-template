import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { mockedAuthorsList } from "@app/shared/mocks/mocks";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent implements OnInit {
  @Input() title: string = "Angular Basics";
  @Input() description: string =
    "Learn Angular from scratch with this comprehensive course.";
  @Input() creationDate: string = "01.01.2023";
  @Input() duration: number = 120; // in minutes
  @Input() authorIds: string[] = [];
  authors: string[] = ["John Doe", "Jane Smith"]; // Mocked authors for demonstration

  @Input() isEditable: boolean = false;
  @Output() clickOnShow = new EventEmitter<void>();

  ngOnInit(): void {
    this.authors = this.authorIds.map((id) => {
      return (
        mockedAuthorsList.find((author) => author.id === id)?.name ||
        "Unknown Author"
      );
    });
  }
}
