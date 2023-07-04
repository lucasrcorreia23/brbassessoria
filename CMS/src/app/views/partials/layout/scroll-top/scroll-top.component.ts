// Angular
import { Component } from "@angular/core";
import { ScrollTopOptions } from "../../../../shared/directives/scroll-top.directive";
// Layout

@Component({
  selector: "kt-scroll-top",
  templateUrl: "./scroll-top.component.html",
})
export class ScrollTopComponent {
  // Public properties
  scrollTopOptions: ScrollTopOptions = {
    offset: 300,
    speed: 600,
  };
}
