// Angular
import { Injectable } from "@angular/core";
// Object-Path
import * as objectPath from "object-path";
// RxJS
import { BehaviorSubject } from "rxjs";
import { LayoutConfigModel } from "../../models/layout-config.model";
// Layout

export interface ClassType {
  header: string[];
  header_container: string[];
  header_mobile: string[];
  header_menu: string[];
  subheader: string[];
  subheader_container: string[];
  content: string[];
  content_container: string[];
  footer_container: string[];
}

@Injectable()
export class HtmlClassService {
  // Public properties
  config!: LayoutConfigModel;
  classes!: ClassType;
  attrs!: any;
  onClassesUpdated$: BehaviorSubject<ClassType>;
  // Private properties
  private loaded: string[] = [];

  /**
   * Component constructor
   */
  constructor() {
    this.onClassesUpdated$ = new BehaviorSubject(this.classes);
  }

  /**
   * Build html element classes from layout config
   * param layoutConfig
   */
  setConfig(layoutConfig: LayoutConfigModel) {
    this.config = this.preInit(layoutConfig);

    // scope list of classes
    this.classes = {
      header: [],
      header_container: [],
      header_mobile: [],
      header_menu: [],
      subheader: [],
      subheader_container: [],
      content: [],
      content_container: [],
      footer_container: [],
    };

    // init base layout
    this.initLayout();
    this.initLoader();

    // init header and subheader menu
    this.initHeader();
    this.initSubheader();

    // init content
    this.initContent();

    // init footer
    this.initFooter();

    this.initSkins();

    this.onClassesUpdated$.next(this.classes);
  }

  /**
   * Returns Classes
   *
   * @param path: string
   * @param toString boolean
   */
  getClasses(path?: string, toString?: boolean): ClassType | string[] | string {
    if (path) {
      const classes = objectPath.get(this.classes, path) || "";
      if (toString && Array.isArray(classes)) {
        return classes.join(" ");
      }
      return classes.toString();
    }
    return this.classes;
  }

  getAttributes(path: any): any {
    return this.attrs[path];
  }

  private preInit(layout: any) {
    const updatedLayout = Object.assign({}, layout);
    const subheaderFixed = objectPath.get(updatedLayout, "subheader.fixed");
    const headerSelfFixedDesktop = objectPath.get(
      updatedLayout,
      "header.self.fixed.desktop"
    );
    if (subheaderFixed && headerSelfFixedDesktop) {
      updatedLayout.subheader.style = "solid";
    } else {
      updatedLayout.subheader.fixed = false;
    }

    return layout;
  }

  /**
   * Init Layout
   */
  private initLayout() {
    const selfBodyBackgroundImage = objectPath.get(
      this.config,
      "self.body.background-image"
    );
    if (selfBodyBackgroundImage) {
      document.body.style.backgroundImage = `url("${selfBodyBackgroundImage}")`;
    }

    const selfBodyClass = (
      objectPath.get(this.config, "self.body.class") || ""
    ).toString();
    if (selfBodyClass) {
      const bodyClasses: string[] = selfBodyClass.split(" ");
      bodyClasses.forEach((cssClass) => document.body.classList.add(cssClass));
    }
  }

  /**
   * Init Loader
   */
  private initLoader() {}

  /**
   * Init Header
   */
  private initHeader() {
    // Fixed header
    const headerSelfFixedDesktop = objectPath.get(
      this.config,
      "header.self.fixed.desktop"
    );
    if (headerSelfFixedDesktop) {
      document.body.classList.add("header-fixed");
      objectPath.push(this.classes, "header", "header-fixed");
    } else {
      document.body.classList.add("header-static");
    }

    const headerSelfFixedMobile = objectPath.get(
      this.config,
      "header.self.fixed.mobile"
    );
    if (headerSelfFixedMobile) {
      document.body.classList.add("header-mobile-fixed");
      objectPath.push(this.classes, "header_mobile", "header-mobile-fixed");
    }

    if (objectPath.get(this.config, "header.self.width") === "fluid") {
      objectPath.push(this.classes, "header_container", "container-fluid");
    } else {
      objectPath.push(this.classes, "header_container", "container");
    }
  }

  /**
   * Init Subheader
   */
  private initSubheader() {
    const subheaderDisplay = objectPath.get(this.config, "subheader.display");
    if (subheaderDisplay) {
      document.body.classList.add("subheader-enabled");
    } else {
      return;
    }

    // Fixed content head
    const subheaderFixed = objectPath.get(this.config, "subheader.fixed");
    const headerSelfFixedDesktop = objectPath.get(
      this.config,
      "header.self.fixed.desktop"
    );
    if (subheaderFixed && headerSelfFixedDesktop) {
      document.body.classList.add("subheader-fixed");
    }

    const subheaderStyle = objectPath.get(this.config, "subheader.style");
    if (subheaderStyle) {
      objectPath.push(this.classes, "subheader", `subheader-${subheaderStyle}`);
    }

    if (objectPath.get(this.config, "subheader.width") === "fluid") {
      objectPath.push(this.classes, "subheader_container", "container-fluid");
    } else {
      objectPath.push(this.classes, "subheader_container", "container");
    }

    if (objectPath.get(this.config, "subheader.clear")) {
      objectPath.push(this.classes, "subheader", "mb-0");
    }
  }

  // Init Content
  private initContent() {
    if (objectPath.get(this.config, "content.fit-top")) {
      objectPath.push(this.classes, "content", "pt-0");
    }

    if (objectPath.get(this.config, "content.fit-bottom")) {
      objectPath.push(this.classes, "content", "pb-0");
    }

    if (objectPath.get(this.config, "content.width") === "fluid") {
      objectPath.push(this.classes, "content_container", "container-fluid");
    } else {
      objectPath.push(this.classes, "content_container", "container");
    }
  }

  /**
   * Init Footer
   */
  private initFooter() {
    // Fixed header
    if (objectPath.get(this.config, "footer.fixed") === true) {
      document.body.classList.add("footer-fixed");
    }

    if (objectPath.get(this.config, "footer.width") === "fluid") {
      objectPath.push(this.classes, "footer_container", "container-fluid");
    } else {
      objectPath.push(this.classes, "footer_container", "container");
    }
  }

  /**
   * Set the body class name based on page skin options
   */
  private initSkins() {
    const headerSelfTheme =
      objectPath.get(this.config, "header.self.theme") || "";
    document.body.classList.add(`brand-${headerSelfTheme}`);
  }
}
