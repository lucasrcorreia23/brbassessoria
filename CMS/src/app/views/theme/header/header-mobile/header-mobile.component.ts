// Angular
import { Component, OnInit } from "@angular/core";
// Layout
import { HtmlClassService } from "../../html-class.service";
import { ToggleOptions } from "../../../../shared/directives/toggle.directive";
import { LayoutConfigService } from "../../../../services/layout-config.service";

@Component({
  selector: "kt-header-mobile",
  templateUrl: "./header-mobile.component.html",
  styleUrls: ["./header-mobile.component.scss"],
})
export class HeaderMobileComponent implements OnInit {
  // Public properties
  headerLogo = "";
  headerMobileClasses = "";

  toggleOptions: ToggleOptions = {
    target: KTUtil.getBody(),
    targetState: "topbar-mobile-on",
    toggleState: "active",
  };

  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   */
  constructor(
    private layoutConfigService: LayoutConfigService,
    private uiService: HtmlClassService
  ) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.headerMobileClasses = this.uiService
      .getClasses("header_mobile", true)
      .toString();
    this.headerLogo = this.getLogoUrl();
  }

  getLogoUrl() {
    const headerSelfTheme =
      this.layoutConfigService.getConfig("header.self.theme") || "";
    const brandSelfTheme =
      this.layoutConfigService.getConfig("brand.self.theme") || "";
    let result = "logo-GrupoStudio-light-180x20.png";
    if (headerSelfTheme === "light") {
      result = "logo-dark.png";
    }
    return `./assets/media/logos/${result}`;
  }
}
