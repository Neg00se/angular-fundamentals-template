import { Component, Input } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent {
  @Input() title: string = "Your list is empty";
  @Input() text?: string =
    "Please use ’Add New Course’ button to add your first course";
}
// Use the names `title` and `text`.
