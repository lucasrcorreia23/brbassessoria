import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthNoticeService } from "../services/auth-notice.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "kt-login",
  templateUrl: "./login.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;

  errors: any = [];

  constructor(
    private auth: AuthService,
    private authNoticeService: AuthNoticeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngOnDestroy(): void {
    this.authNoticeService.setNotice(null);
    this.loading = false;
  }

  initLoginForm() {
    let login = "";

    if (localStorage.getItem("login") && localStorage.getItem("login") != "") {
      login = localStorage.getItem("login")!;
    }

    this.loginForm = this.fb.group({
      login: [
        login,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
      ],
    });
  }

  submit() {
    if (this.loading) {
      return;
    }

    this.authNoticeService.setNotice(null);
    const controls = this.loginForm.controls;

    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    const authData = {
      login: controls.login.value,
      password: controls.password.value,
    };

    this.auth.login(authData.login, authData.password).subscribe(
      (_) => {
        this.loading = false;

        this.authNoticeService.setNotice(
          "Login efetuado com sucesso!",
          "success"
        );

        this.router.navigate([""]);
      },
      (error) => {
        this.loading = false;
        this.authNoticeService.setNotice(error, "danger");
      }
    );
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }
}
