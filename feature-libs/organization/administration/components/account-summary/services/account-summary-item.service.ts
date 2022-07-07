import { Injectable } from '@angular/core';
import { AccountSummary,
  RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  AccountSummaryService
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';

import { AccountSummaryFormService } from '../form/account-summary-form.service';
import { CurrentAccountSummaryService } from '../services/current-account-summary.service';


@Injectable({
  providedIn: 'root',
})
export class AccountSummaryItemService extends ItemService<AccountSummary> {
  constructor(
    protected currentItemService: CurrentAccountSummaryService,
    protected routingService: RoutingService,
    protected formService: AccountSummaryFormService,
    protected accountSummaryService: AccountSummaryService,
  ) {
    super(currentItemService, routingService, formService);
  }

  /**
   * @override
   * Returns the unit for the given code.
   *
   * Loads the unit each time, to ensure accurate data is resolved.
   */
  load(code: string): Observable<AccountSummary> {
    const accountSummaryParams = {
      pageSize: 10,
      b2bUnitCode: code,
    } as any;
    this.accountSummaryService.loadDetails(code);
    this.accountSummaryService.loadAccountSummaryDocuments(accountSummaryParams);
    const accountSummaryDocumentEntitiesModel = this.accountSummaryService.getList(accountSummaryParams);
    accountSummaryDocumentEntitiesModel.subscribe(documents =>
      console.log(`Documents for ${code} are:`, documents)
    );
    return this.accountSummaryService.getDetails(code);
  }

  // ToDo: Replace this, update needs to be implemented otherwise won't compile
  update(code, value: AccountSummary): Observable<OrganizationItemStatus<AccountSummary>> {
    return code && value ? undefined : undefined;
    // this.unitService.update(code, value);
    // return this.unitService.getLoadingStatus(value.documentNumber);
  }

  // ToDo: Replace this, create needs to be implemented otherwise won't compile
  protected create(
    value: AccountSummary
  ): Observable<OrganizationItemStatus<AccountSummary>> {
    return value ? undefined : undefined;
    // this.unitService.create(value);
    // return this.unitService.getLoadingStatus(value.documentNumber);
  }

  /**
   * @override
   * Returns details page of Account Summary
   */
  protected getDetailsRoute(): string {
    return 'orgAccountSummaryDetails';
  }
}
