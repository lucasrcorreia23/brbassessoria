import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthNotice } from '../models/auth-notice.model';

@Injectable({
  providedIn: 'root',
})
export class AuthNoticeService {
  onNoticeChanged$: BehaviorSubject<AuthNotice | any>;

  constructor() {
    this.onNoticeChanged$ = new BehaviorSubject(null);
  }

  setNotice(message: string | null, type?: string) {
    const notice: AuthNotice = {
      message,
      type,
    };

    this.onNoticeChanged$.next(notice);
  }
}
