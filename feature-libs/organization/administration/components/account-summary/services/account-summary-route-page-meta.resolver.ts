import { Injectable } from '@angular/core';
import {
  AccountSummary,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentAccountSummaryService } from './current-account-summary.service';

@Injectable({ providedIn: 'root' })
export class AccountSummaryRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentAccountSummaryService
  ) {
    super(translation);
  }

  protected getParams(): Observable<AccountSummary> {
    return this.currentItemService.item$;
  }
}
