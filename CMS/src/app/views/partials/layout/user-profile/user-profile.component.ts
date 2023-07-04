import { Component, Input, OnInit } from "@angular/core";
import { User } from "../../../../models/user.model";
import { Router } from "@angular/router";
import { AuthService } from "../../../pages/auth/services/auth.service";

@Component({
  selector: "kt-user-profile",
  templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent implements OnInit {
  user!: User;

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge!: boolean;
  @Input() icon!: boolean;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.auth.usuario;
  }

  logout(): void {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    this.router.navigate(["auth"]);
  }
}
