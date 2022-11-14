import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CaptchaComponent } from './captcha.component';
import { CommonModule } from '@angular/common';
import { defaultCaptchaApiConfig } from './config/default-captcha-api-config';

@NgModule({
  imports: [CommonModule],
  declarations: [CaptchaComponent],
  providers: [provideDefaultConfig(defaultCaptchaApiConfig)],
  exports: [CaptchaComponent],
})
export class CaptchaModule {}