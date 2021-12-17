import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthService,
  CmsConfig,
  GlobalMessageService,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
  WindowRef
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { CdcLoginComponentService } from 'integration-libs/cdc/core/auth/services/user-authentication/cdc-login.service';
import { CdcJsService } from 'integration-libs/cdc/root/service/cdc-js.service';
import { environment } from 'projects/storefrontapp/src/environments/environment';
import { LoginFormComponentService } from './login-form-component.service';
import { LoginFormComponent } from './login-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: LoginFormComponent,
          guards: [NotAuthGuard],
          providers: [
            {
              provide: LoginFormComponentService,
              useClass: environment.cdc? CdcLoginComponentService: LoginFormComponentService,
              deps: [AuthService, GlobalMessageService, WindowRef, CdcJsService],
            },
          ],
        },
      },
    }),
  ],
  declarations: [LoginFormComponent],
})
export class LoginFormModule {}
