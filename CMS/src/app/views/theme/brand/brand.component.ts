import { AfterViewInit, Component, OnInit } from "@angular/core";
import { HtmlClassService } from "../html-class.service";
import { ToggleOptions } from "../../../shared/directives/toggle.directive";
import { LayoutConfigService } from "../../../services/layout-config.service";

@Component({
  selector: "kt-brand",
  templateUrl: "./brand.component.html",
})
export class BrandComponent implements OnInit, AfterViewInit {
  // Public properties
  headerLogo = "";
  brandClasses = "";
  asideSelfMinimizeToggle = true;

  toggleOptions: ToggleOptions = {
    target: "kt_body",
    targetState: "aside-minimize",
    toggleState: "active",
  };

  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   * @param htmlClassService: HtmlClassService
   */
  constructor(
    private layoutConfigService: LayoutConfigService,
    public htmlClassService: HtmlClassService
  ) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.headerLogo = this.getAsideLogo();
    this.brandClasses = this.htmlClassService
      .getClasses("brand", true)
      .toString();
    this.asideSelfMinimizeToggle = this.layoutConfigService.getConfig(
      "aside.self.minimize.toggle"
    );
  }

  /**
   * On after view init
   */
  ngAfterViewInit(): void {}

  getAsideLogo() {
    let result = "logo-GrupoStudio-light-180x20.png";
    const brandSelfTheme =
      this.layoutConfigService.getConfig("brand.self.theme") || "";
    if (brandSelfTheme === "light") {
      result = "logo-dark.png";
    }
    return `./assets/media/logos/${result}`;
  }

  toggleAsideClick() {
    document.body.classList.toggle("aside-minimize");
  }
}
