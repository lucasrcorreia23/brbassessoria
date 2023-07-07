import { Injectable } from "@angular/core";
import { NavigationEnd, Params, Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { filter } from "rxjs/operators";
import * as objectPath from "object-path";
import { PageConfigService } from "./page-config.service";
import { MenuConfigService } from "./menu-config.service";

export interface Breadcrumb {
  title: string;
  page: string | any;
  queryParams: Params | null;
}

export interface BreadcrumbTitle {
  title: string;
  desc?: string;
}

@Injectable()
export class SubheaderService {
  title$: BehaviorSubject<BreadcrumbTitle> =
    new BehaviorSubject<BreadcrumbTitle>({ title: "", desc: "" });
  breadcrumbs$: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<
    Breadcrumb[]
  >([]);
  disabled$: Subject<boolean> = new Subject<boolean>();

  private manualBreadcrumbs: any = {};
  private appendingBreadcrumbs: any = {};
  private manualTitle: any = {};

  private headerMenus: any;
  private pageConfig: any;

  constructor(
    private router: Router,
    private pageConfigService: PageConfigService,
    private menuConfigService: MenuConfigService
  ) {
    const initBreadcrumb = () => {
      // get updated title current page config
      this.pageConfig = this.pageConfigService.getCurrentPageConfig();

      this.headerMenus = objectPath.get(
        this.menuConfigService.getMenus(),
        "header"
      );

      if (objectPath.get(this.manualTitle, this.router.url)) {
        this.setTitle(this.manualTitle[this.router.url]);
      } else {
        // get updated page title on every route changed
        this.title$.next(objectPath.get(this.pageConfig, "page"));

        // subheader enable/disable
        const hideSubheader = objectPath.get(this.pageConfig, "page.subheader");
        this.disabled$.next(
          typeof hideSubheader !== "undefined" && !hideSubheader
        );

        if (objectPath.get(this.manualBreadcrumbs, this.router.url)) {
          // breadcrumbs was set manually
          this.setBreadcrumbs(this.manualBreadcrumbs[this.router.url]);
        } else {
          // breadcrumbs was appended before, reuse it for this page
          if (objectPath.get(this.appendingBreadcrumbs, this.router.url)) {
            this.appendBreadcrumbs(this.appendingBreadcrumbs[this.router.url]);
          }
        }
      }
    };

    initBreadcrumb();

    // subscribe to router events
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(initBreadcrumb);
  }

  /**
   * Manually set full breadcrumb paths
   */
  setBreadcrumbs(breadcrumbs: Breadcrumb[] | any[]) {
    this.manualBreadcrumbs[this.router.url] = breadcrumbs;
    this.breadcrumbs$.next(breadcrumbs);
  }

  /**
   * Append breadcrumb to the last existing breadcrumbs
   * param breadcrumbs
   */
  appendBreadcrumbs(breadcrumbs: Breadcrumb[] | any[]) {
    this.appendingBreadcrumbs[this.router.url] = breadcrumbs;
    const prev = this.breadcrumbs$.getValue();
    this.breadcrumbs$.next(prev.concat(breadcrumbs));
  }

  /**
   * Get breadcrumbs from menu items
   * param menus
   */
  getBreadcrumbs(menus: any): Breadcrumb[] {
    let url = this.pageConfigService.cleanUrl(this.router.url);
    url = url.replace(new RegExp(/\./, "g"), "/");
    const urls = getUrlsFromCurrentUrl(url);

    const breadcrumbs: Breadcrumb[] = [];
    for (let u = 0; u < urls.length; u++) {
      const menuPath = this.getPath(menus, urls[u]) || [];
      menuPath.forEach((key) => {
        menus = menus[key];
        if (typeof menus !== "undefined" && menus.title) {
          const item = {
            title: menus.title,
            page: urls[u],
            queryParams: null,
          };
          breadcrumbs.push(item);
        }
      });
    }
    return breadcrumbs;
  }

  /**
   * Set title
   *
   * @param title: string
   */
  setTitle(title: string) {
    this.manualTitle[this.router.url] = title;
    this.title$.next({ title });
  }

  /**
   * Get object path by value
   * param obj
   * param value
   */
  getPath(obj: any, value: any) {
    if (typeof obj !== "object") {
      return;
    }
    const path: any[] = [];
    let found = false;

    const search = (haystack: any) => {
      // tslint:disable-next-line
      for (let key in haystack) {
        path.push(key);
        if (haystack[key] === value) {
          found = true;
          break;
        }
        if (typeof haystack[key] === "object") {
          search(haystack[key]);
          if (found) {
            break;
          }
        }
        path.pop();
      }
    };

    search(obj);
    return path;
  }
}

function getUrlsFromCurrentUrl(currentUrl: string): string[] {
  const result: string[] = [];
  const urlParts = currentUrl.split("/");
  urlParts.reduce((accum, item) => {
    const url = `${accum}/${item}`;
    result.push(url);
    return url;
  }, "");
  return result;
}
