import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { StickyDirective } from '../../../../shared/directives/sticky.directive';

@Component({
  selector: 'kt-portlet-header',
  styleUrls: ['portlet-header.component.scss'],
  template: ` <div class="card-title" [hidden]="noTitle">
      <span class="card-icon" #refIcon [hidden]="hideIcon || !icon">
        <ng-content *ngIf="!icon" select="[ktPortletIcon]"></ng-content>
        <i *ngIf="icon" [ngClass]="icon"></i>
      </span>
      <ng-content *ngIf="!title" select="[ktPortletTitle]"></ng-content>
      <h3 *ngIf="title" class="card-label" [innerHTML]="title"></h3>
    </div>
    <div class="card-toolbar" #refTools [hidden]="hideTools">
      <ng-content select="[ktPortletTools]"></ng-content>
    </div>`,
})
export class PortletHeaderComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // Public properties
  // append html class to the portlet header
  @Input() class!: string;
  // a simple title text
  @Input() title!: string;
  // icon name to be added to the i tag
  @Input() icon!: string;
  // remove title container
  @Input() noTitle!: boolean;
  // enable sticky portlet header
  @Input() sticky!: boolean;

  @HostBinding('class') classes = 'card-header';
  @HostBinding('attr.ktSticky') stickyDirective: StickyDirective;

  @ViewChild('refIcon', { static: true }) refIcon!: ElementRef;
  hideIcon!: boolean;

  @ViewChild('refTools', { static: true }) refTools!: ElementRef;
  hideTools!: boolean;

  private lastScrollTop = 0;
  private isScrollDown = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.stickyDirective = new StickyDirective(this.el, this.platformId);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateStickyPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateStickyPosition();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrollDown = st > this.lastScrollTop;
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  updateStickyPosition() {
    if (this.sticky) {
      Promise.resolve(null).then(() => {
        // get boundary top margin for sticky header
        const headerElement = document.querySelector('.header') as HTMLElement;
        const subheaderElement = document.querySelector(
          '.subheader'
        ) as HTMLElement;
        const headerMobileElement = document.querySelector(
          '.header-mobile'
        ) as HTMLElement;

        let height = 0;

        if (headerElement != null) {
          // mobile header
          if (window.getComputedStyle(headerElement).height === '0px') {
            height += headerMobileElement.offsetHeight;
          } else {
            // desktop header
            if (document.body.classList.contains('header-minimize-topbar')) {
              // hardcoded minimized header height
              height = 60;
            } else {
              // normal fixed header
              if (document.body.classList.contains('header-fixed')) {
                height += headerElement.offsetHeight;
              }
              if (document.body.classList.contains('subheader-fixed')) {
                height += subheaderElement.offsetHeight;
              }
            }
          }
        }

        this.stickyDirective.marginTop = height;
      });
    }
  }

  ngOnInit() {
    if (this.sticky) {
      this.stickyDirective.ngOnInit();
    }

    // append custom class
    this.classes += this.class ? ' ' + this.class : '';

    // hide icon's parent node if no icon provided
    this.hideIcon = this.refIcon.nativeElement.children.length === 0;

    // hide tools' parent node if no tools template is provided
    this.hideTools = this.refTools.nativeElement.children.length === 0;
  }

  ngAfterViewInit(): void {
    if (this.sticky) {
      this.updateStickyPosition();
      this.stickyDirective.ngAfterViewInit();
    }
  }

  ngOnDestroy(): void {
    if (this.sticky) {
      this.stickyDirective.ngOnDestroy();
    }
  }
}
