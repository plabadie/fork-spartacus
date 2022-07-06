import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OccEmulatedUserRestInterceptor } from './occ-emulated-user-rest.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OccEmulatedUserRestInterceptor,
      multi: true,
    },
  ],
})
export class OccEmulatedCustomerInterceptorModule {}
