import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "cgc",
})
export class CgcPipe implements PipeTransform {
  transform(value?: string) {
    if (value && value.trim().length > 11) {
      return (
        value.substring(0, 2) +
        "." +
        value.substring(2, 5) +
        "." +
        value.substring(5, 8) +
        "/" +
        value.substring(8, 12) +
        "-" +
        value.substring(12)
      );
    } else {
      if (value && value.trim().length == 11) {
        return (
          value.substring(0, 3) +
          "." +
          value.substring(3, 6) +
          "." +
          value.substring(6, 9) +
          "-" +
          value.substring(9)
        );
      }
    }
    return "";
  }
}
