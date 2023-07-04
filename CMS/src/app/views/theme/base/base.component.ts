import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs";
import * as objectPath from "object-path";
import { HtmlClassService } from "../html-class.service";
import { LayoutConfig } from "../../../shared/_config/layout.config";
import { PageConfig } from "../../../shared/_config/page.config";
import { LayoutConfigService } from "../../../services/layout-config.service";
import { MenuConfigService } from "../../../services/menu-config.service";
import { PageConfigService } from "../../../services/page-config.service";

@Component({
  selector: "kt-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BaseComponent implements OnInit, OnDestroy {
  selfLayout = "default";
  contentClasses = "";
  contentContainerClasses = "";
  contentExtended!: false;

  // Private properties
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private layoutConfigService: LayoutConfigService,
    private menuConfigService: MenuConfigService,
    private pageConfigService: PageConfigService,
    private htmlClassService: HtmlClassService
  ) {
    // register configs by demos
    this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
    this.pageConfigService.loadConfigs(new PageConfig().configs);

    // setup element classes
    this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

    const subscription = this.layoutConfigService.onConfigUpdated$.subscribe(
      (layoutConfig) => {
        // reset body class based on global and page level layout config, refer to html-class.service.ts
        document.body.className = "";
        this.htmlClassService.setConfig(layoutConfig);
      }
    );
    this.unsubscribe.push(subscription);
  }

  ngOnInit(): void {
    const config = this.layoutConfigService.getConfig();
    // Load UI from Layout settings
    this.selfLayout = objectPath.get(config, "self.layout");
    this.contentClasses = this.htmlClassService
      .getClasses("content", true)
      .toString();
    this.contentContainerClasses = this.htmlClassService
      .getClasses("content_container", true)
      .toString();
    this.contentExtended = objectPath.get(config, "content.extended");

    // let the layout type change
    const subscription = this.layoutConfigService.onConfigUpdated$.subscribe(
      (cfg) => {
        setTimeout(() => {
          this.selfLayout = objectPath.get(cfg, "self.layout");
        });
      }
    );
    this.unsubscribe.push(subscription);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
