import { Injectable } from '@angular/core';
import { AccountSummary,
  // B2BUnit,
  RoutingService,
 } from '@spartacus/core';
import { AccountSummaryService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import {Observable, of} from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentAccountSummaryService extends CurrentItemService<AccountSummary> {
  constructor(
    protected routingService: RoutingService,
    protected accountSummaryService: AccountSummaryService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.accountSummaryCode;
  }

  protected getItem(code: string): Observable<AccountSummary> {
    return this.accountSummaryService.getDetails(code);
  }

  getError(code: string): Observable<boolean> {
    console.log('there was an error', code);
    return of(code ? false : true);
    // return this.orgAccountSummaryService.getErrorState(code);
  }
}
