import { Injectable } from '@angular/core';
import {
  Address,
  DefaultRoutePageMetaResolver,
  TranslationService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentAccountSummaryAddressService } from '../links/addresses/services/current-account-summary-address.service';

@Injectable({ providedIn: 'root' })
export class AccountSummaryAddressRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
  constructor(
    translation: TranslationService,
    protected currentItemService: CurrentAccountSummaryAddressService
  ) {
    super(translation);
  }

  protected getParams(): Observable<Address> {
    return this.currentItemService.item$;
  }
}
