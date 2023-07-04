import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  NgbDropdownModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { PartialsModule } from "../../partials/partials.module";
import { DashboardComponent } from "./dashboard.component";
import { InlineSVGModule } from "ng-inline-svg";
import { ClientService } from "../client/services/client.service";

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
    // ng-bootstrap modules
    NgbDropdownModule,
    NgbTooltipModule,
    InlineSVGModule,
    SharedModule,
  ],
  providers: [ClientService],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
