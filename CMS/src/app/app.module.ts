import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { OverlayModule } from "@angular/cdk/overlay";
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { InlineSVGModule } from "ng-inline-svg";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ThemeModule } from "./views/theme/theme.module";
import { PartialsModule } from "./views/partials/partials.module";
import { AuthModule } from "./views/pages/auth/auth.module";
import { LayoutConfig } from "./shared/_config/layout.config";
import { HighlightModule } from "ngx-highlightjs";
import { LayoutConfigService } from "./services/layout-config.service";
import { LayoutRefService } from "./services/layout-ref.service";
import { MenuConfigService } from "./services/menu-config.service";
import { PageConfigService } from "./services/page-config.service";
import { SplashScreenService } from "./services/splash-screen.service";
import { ModuleGuard } from "./services/module.guard";
import { MAT_DATE_LOCALE } from "@angular/material/core";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 0.5,
  swipeEasing: true,
  minScrollbarLength: 40,
  maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighlightModule,
    PartialsModule,
    OverlayModule,
    StoreDevtoolsModule.instrument(),
    AuthModule.forRoot(),
    MatProgressSpinnerModule,
    InlineSVGModule.forRoot(),
    ThemeModule,
  ],
  exports: [],
  providers: [
    ModuleGuard,
    LayoutConfigService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    SplashScreenService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService],
      multi: true,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: "pt-BR",
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
