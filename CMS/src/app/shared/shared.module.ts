import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToggleDirective } from "./directives/toggle.directive";
import { FirstLetterPipe } from "./pipes/first-letter.pipe";
import { StickyDirective } from "./directives/sticky.directive";
import { IConfig, NgxMaskModule } from "ngx-mask";
import { LayoutUtilsService } from "../services/layout-utils.service";
import { ContentAnimateDirective } from "./directives/content-animate.directive";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatNativeDateModule } from "@angular/material/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptService } from "../services/intercept.service";
import { AuthService } from "../views/pages/auth/services/auth.service";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { take } from "rxjs/operators";

export function getState(store: any) {
  let state: any;
  store.pipe(take(1)).subscribe((o: any) => (state = o));
  return state;
}

const materialExport = [
  MatButtonModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatIconModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatTabsModule,
  MatTooltipModule,
  MatDialogModule,
  MaterialFileInputModule,
  MatSlideToggleModule,
  NgxMatSelectSearchModule,
  MatListModule,
  MatDividerModule,
];

export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    SweetAlert2Module.forRoot(),
    ...materialExport,
  ],
  declarations: [
    FirstLetterPipe,
    ToggleDirective,
    StickyDirective,
    ContentAnimateDirective,
  ],
  exports: [
    FirstLetterPipe,
    ToggleDirective,
    StickyDirective,
    ContentAnimateDirective,

    NgxMaskModule,
    SweetAlert2Module,
    ...materialExport,
  ],
  providers: [
    AuthService,
    LayoutUtilsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: "kt-mat-dialog-container__wrapper",
        height: "auto",
        width: "900px",
      },
    },
  ],
})
export class SharedModule {}
