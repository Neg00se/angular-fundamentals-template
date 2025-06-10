import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import { fas, IconName } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.

  @Input() buttonText?: string;
  @Input() iconName?: IconName;
}
