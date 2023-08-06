import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { InterceptService } from './intercept.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal-relatorio/modal.component';

import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

import { FaqComponent } from './faq/faq.component';
import { MatExpansionModule } from '@angular/material/expansion';






import {
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
  provideNgxMask,
} from 'ngx-mask';

import { MatSelectModule } from '@angular/material/select';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatStepperModule,
    MatSelectModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    
  ],
  declarations: [AppComponent, AppComponent, ModalComponent, PrivacyPolicyComponent, FaqComponent],
  
  providers: [
    AppService,
    provideNgxMask(maskConfigFunction),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true,
    },
    
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
