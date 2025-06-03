import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date) {
    const day = String(value.getDate()).padStart(2, "0");
    const month = String(value.getMonth() + 1).padStart(2, "0"); // Месяцы 0-индексированные
    const year = value.getFullYear();

    return `${day}.${month}.${year}`;
  }
  // Add your code here
}
