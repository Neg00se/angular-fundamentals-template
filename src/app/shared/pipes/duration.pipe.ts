import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (
      value === null ||
      value === undefined ||
      typeof value !== "number" ||
      isNaN(value)
    ) {
      return "00:00 hour";
    }

    if (value < 0) {
      value = 0;
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    const hourText = hours <= 1 ? "hour" : "hours";

    return `${formattedHours}:${formattedMinutes} ${hourText}`;
  }
}
