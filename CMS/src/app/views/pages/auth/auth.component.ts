import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SplashScreenService } from "../../../services/splash-screen.service";

@Component({
  selector: "kt-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  constructor(private splashScreenService: SplashScreenService) {}

  ngOnInit(): void {
    this.splashScreenService.hide();
  }
}
