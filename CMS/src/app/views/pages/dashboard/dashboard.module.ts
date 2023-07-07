import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PartialsModule } from "../../partials/partials.module";
import { DashboardComponent } from "./dashboard.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { DashboardService } from "./dashboard.service";

@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
    RouterModule.forChild([
      {
        path: "",
        component: DashboardComponent,
        data: { breadcrumb: "Dashboard" },
      },
    ]),
    SharedModule,
    FormsModule,
    BrowserModule,
    CKEditorModule,
  ],
  providers: [DashboardService],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
