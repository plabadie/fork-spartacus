import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OccEmulatedUserRestInterceptor implements HttpInterceptor {
  protected readonly HTTP_HEADER_NAME_USER_ID = 'sap-commerce-cloud-user-id';

  constructor(protected userIdService: UserIdService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let isEmulated;
    let userId;

    this.userIdService
      .isEmulated()
      .subscribe((emulated) => (isEmulated = emulated))
      .unsubscribe();
    if (!request.url.endsWith('token') && isEmulated) {
      this.userIdService
        .getUserId()
        .subscribe((id) => (userId = id))
        .unsubscribe();
      if (userId) {
        const modifiedReq = request.clone({
          headers: request.headers.set(this.HTTP_HEADER_NAME_USER_ID, userId),
        });
        return next.handle(modifiedReq);
      }
    }
    return next.handle(request);
  }
}
