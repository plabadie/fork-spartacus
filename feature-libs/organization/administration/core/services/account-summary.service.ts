import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AccountSummary,
  AccountSummaryDocument,
  EntitiesModel,
  SearchConfig,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import {Observable, queueScheduler, using} from 'rxjs';
import {StateWithOrganization, AccountSummaryActions} from '../store/index';

import {
  getAccountSummaryDetails,
  getAccountSummaryDocument,
  getAccountSummaryDocumentList,
  getAccountSummaryValue,
} from '../store/selectors/account-summary.selector';

import { auditTime, filter, map, observeOn, tap } from 'rxjs/operators';
import { OrganizationItemStatus} from "../model";
import {getItemStatus} from "../utils/get-item-status";

@Injectable({ providedIn: 'root' })
export class AccountSummaryService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  // load(orgUnitId: string): void {
  //   this.userIdService.takeUserId(true).subscribe(
  //     (userId) =>
  //       this.store.dispatch(
  //         new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId })
  //       ),
  //     () => {
  //       // TODO: for future releases, refactor this part to thrown errors
  //     }
  //   );
  // }

  loadDetails(unitCode): void {
    console.log(`ccc account-summary.service loadDetails(unitCode = ${unitCode})`);
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new AccountSummaryActions.LoadAccountSummary({ userId, unitCode })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  LoadAccountSummaryDocument(documentNumber: string): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(
          new AccountSummaryActions.LoadAccountSummaryDocument({ userId, documentNumber })
        ),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  loadAccountSummaryDocuments(params?: SearchConfig): void {
    this.userIdService.takeUserId(true).subscribe(
      (userId) =>
        this.store.dispatch(new AccountSummaryActions.LoadAccountSummaryDocuments({ userId, params })),
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  private getAccountSummaryState(
    documentNumber: string
  ): Observable<StateUtils.LoaderState<AccountSummaryDocument>> {
    return this.store.select(getAccountSummaryDocument(documentNumber));
  }

  private getAccountSummaryValue(documentNumber: string): Observable<AccountSummaryDocument> {
    return this.store.select(getAccountSummaryValue(documentNumber)).pipe(filter(Boolean));
  }

  // private getAccountSummaryDetails(unitCode: string): Observable<StateUtils.LoaderState<EntitiesModel<AccountSummary>>> {
  private getAccountSummaryDetails(unitCode: string): Observable<StateUtils.LoaderState<AccountSummary>> {
    return this.store.select(getAccountSummaryDetails(unitCode));
  }


  private getAccountSummaryList(
    params
  ): Observable<StateUtils.LoaderState<EntitiesModel<AccountSummaryDocument>>> {
    return this.store.select(getAccountSummaryDocumentList(params));
  }

  get(documentNumber: string): Observable<AccountSummaryDocument> {
    const loading$ = this.getAccountSummaryState(documentNumber).pipe(
      auditTime(0),
      tap((state) => {
        if (!(state.loading || state.success || state.error)) {
          this.LoadAccountSummaryDocument(documentNumber);
        }
      })
    );

    return using(
      () => loading$.subscribe(),
      () => this.getAccountSummaryValue(documentNumber)
    );
  }

  getDetails(unitCode): Observable<AccountSummary> {
    return this.getAccountSummaryDetails(unitCode).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<AccountSummary>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadDetails(unitCode);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<AccountSummary>) =>
          process.success || process.error
      ),
      map((result) => result.value as AccountSummary)
    );
  }

  getList(params: SearchConfig): Observable<EntitiesModel<AccountSummaryDocument>> {
    return this.getAccountSummaryList(params).pipe(
      observeOn(queueScheduler),
      tap((process: StateUtils.LoaderState<EntitiesModel<AccountSummaryDocument>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadAccountSummaryDocuments(params);
        }
      }),
      filter(
        (process: StateUtils.LoaderState<EntitiesModel<AccountSummaryDocument>>) =>
          process.success || process.error
      ),
      map((result) => result.value)
    );
  }

  // todo: delete this function, was created just to make it build for now
  getLoadingStatus(
    documentNumber: string
  ): Observable<OrganizationItemStatus<AccountSummaryDocument>> {
    return getItemStatus(this.getAccountSummaryState(documentNumber));
  }

  // todo: delete this function, was created just to make it build for now
  create(accountSummary: AccountSummaryDocument): void {
    console.log(accountSummary);
  }

  // todo: delete this function, was created just to make it build for now
  update(accountSummaryNumber: string, accountSummary: AccountSummaryDocument): void {
    console.log(accountSummaryNumber, accountSummary)
  }
}
