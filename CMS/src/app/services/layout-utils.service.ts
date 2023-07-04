import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LayoutUtilsService {
  constructor(private snackBar: MatSnackBar) {}

  showActionNotification(
    message: string,
    duration: number = 10000,
    verticalPosition: 'top' | 'bottom' = 'bottom'
  ) {
    return this.snackBar.open(message, '', {
      duration,
      verticalPosition,
    });
  }
}
