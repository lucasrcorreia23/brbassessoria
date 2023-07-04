// Angular
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
// RxJS
import { Subscription } from 'rxjs';
import { AuthNoticeService } from '../services/auth-notice.service';
import { AuthNotice } from '../models/auth-notice.model';

@Component({
  selector: 'kt-auth-notice',
  templateUrl: './auth-notice.component.html',
})
export class AuthNoticeComponent implements OnInit, OnDestroy {
  @Output() type: any;
  @Output() message: any = '';

  // Private properties
  private subscriptions: Subscription[] = [];

  /**
   * Component Constructure
   *
   * @param authNoticeService
   */
  constructor(public authNoticeService: AuthNoticeService) {}

  /*
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.subscriptions.push(
      this.authNoticeService.onNoticeChanged$.subscribe(
        (notice: AuthNotice) => {
          notice = Object.assign({}, { message: '', type: '' }, notice);
          this.message = notice.message;
          this.type = notice.type;
        }
      )
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
