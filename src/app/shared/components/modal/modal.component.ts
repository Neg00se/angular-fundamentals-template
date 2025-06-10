import { Component } from "@angular/core";
import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule],
})
export class ModalComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
