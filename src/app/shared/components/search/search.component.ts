import { Component } from "@angular/core";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  standalone: true,
  imports: [ButtonComponent],
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
}
