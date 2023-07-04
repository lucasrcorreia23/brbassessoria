import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {
  NgbProgressbarModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { InlineSVGModule } from "ng-inline-svg";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { HeaderComponent } from "./header/header.component";
import { AsideLeftComponent } from "./aside/aside-left.component";
import { FooterComponent } from "./footer/footer.component";
import { SubheaderComponent } from "./subheader/subheader.component";
import { BrandComponent } from "./brand/brand.component";
import { TopbarComponent } from "./header/topbar/topbar.component";
import { PartialsModule } from "../partials/partials.module";
import { BaseComponent } from "./base/base.component";
import { HtmlClassService } from "./html-class.service";
import { HeaderMobileComponent } from "./header/header-mobile/header-mobile.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    BaseComponent,
    FooterComponent,

    // headers
    HeaderComponent,
    BrandComponent,
    HeaderMobileComponent,

    // subheader
    SubheaderComponent,

    // topbar components
    TopbarComponent,

    // aside left menu components
    AsideLeftComponent,
  ],
  exports: [
    BaseComponent,
    FooterComponent,

    // headers
    HeaderComponent,
    BrandComponent,
    HeaderMobileComponent,

    // subheader
    SubheaderComponent,

    // topbar components
    TopbarComponent,

    // aside left menu components
    AsideLeftComponent,
  ],
  providers: [HtmlClassService],
  imports: [
    CommonModule,
    RouterModule,
    PartialsModule,
    PerfectScrollbarModule,
    FormsModule,
    MatProgressBarModule,
    MatTabsModule,
    MatButtonModule,
    MatTooltipModule,
    LoadingBarModule,
    NgxDaterangepickerMd,
    InlineSVGModule,

    // ng-bootstrap modules
    NgbProgressbarModule,
    NgbTooltipModule,

    SharedModule,
  ],
})
export class ThemeModule {}
