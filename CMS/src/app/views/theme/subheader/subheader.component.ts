import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../../../services/subheader.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'kt-subheader',
  templateUrl: './subheader.component.html',
})
export class SubheaderComponent implements OnInit {
  title = '';
  breadcrumbs: Breadcrumb[] = [];

  rootRoute = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    let url = this.cleanUrl(this.router.url);
    url = url.replace(new RegExp(/\./, 'g'), '/');

    this.rootRoute = url.split('/')[0];

    this.setBreadcrumbs();

    // subscribe to the NavigationEnd event
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setBreadcrumbs();
      }
    });
  }

  private setBreadcrumbs() {
    let root: ActivatedRoute = this.route.root;
    this.breadcrumbs = this.getBreadcrumbs(root, '/' + this.rootRoute);

    if (this.breadcrumbs.length > 0) {
      this.title = this.breadcrumbs[0].title;
      this.breadcrumbs.splice(0, 1);
    }
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    let ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    // get the child routes
    let children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (let child of children) {
      // verify the custom data property 'breadcrumb' is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      let routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      // append route URL to URL
      url += `/${routeURL}`;

      // add breadcrumb
      let breadcrumb: Breadcrumb = {
        title: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        page: url,
        queryParams: null,
      };

      breadcrumbs.push(breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  cleanUrl(url: string): string {
    // remove first route (demo name) from url router
    if (new RegExp(/^\/demo/).test(url)) {
      const urls = url.split('/');
      urls.splice(0, 2);
      url = urls.join('/');
    }

    if (url.charAt(0) == '/') {
      url = url.substr(1);
    }

    // we get the page title from config, using url path.
    // we need to remove query from url ?id=1 before we use the path to search in array config.
    let finalUrl = url.replace(/\//g, '.');
    if (finalUrl.indexOf('?') !== -1) {
      finalUrl = finalUrl.substring(0, finalUrl.indexOf('?'));
    }

    return finalUrl;
  }
}
