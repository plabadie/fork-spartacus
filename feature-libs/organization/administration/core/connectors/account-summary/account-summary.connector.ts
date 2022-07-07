import { Injectable } from '@angular/core';
import { AccountSummary, AccountSummaryDocument, EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import { AccountSummaryAdapter } from './account-summary.adapter';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryConnector {
  constructor(protected adapter: AccountSummaryAdapter) {}

  getDetails(userId: string, unitCode: string) : Observable<AccountSummary> {
    return this.adapter.loadDetails(userId, unitCode)
  }

  get(userId: string, documentNumber: string): Observable<AccountSummaryDocument> {
    return this.adapter.load(userId, documentNumber);
  }

  getList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<AccountSummaryDocument>> {
    return this.adapter.loadList(userId, params);
  }

}
