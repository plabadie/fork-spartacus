import { AccountSummary, AccountSummaryDocument, EntitiesModel, SearchConfig } from '@spartacus/core';

import { Observable } from "rxjs";

export abstract class AccountSummaryAdapter {
  /**
   * Abstract method used to load Account Summary data.
   * AccountSummary's data can be loaded from alternative sources, as long as the structure
   * converts to the `AccountSummary`.
   *
   * @param userId The `userId` for given Account Summary Document
   * @param documentNumber The `documentNumber` for given Account Summary Document
   */
  abstract load(userId: string, documentNumber: string): Observable<AccountSummaryDocument>;

  abstract loadList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<AccountSummaryDocument>>;

  abstract loadDetails(userId: string, documentNumber: string): Observable<AccountSummary>;
}
