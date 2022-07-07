import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { AccountSummary } from '@spartacus/core';
import { AccountSummaryActions } from '../actions/index';
import {
  AccountSummaryManagement,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import { AccountSummarySelectors } from './index';

describe('AccountSummary Selectors', () => {
  let store: Store<StateWithOrganization>;
  const accountSummary: AccountSummary = {
    id: '123'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAccountSummaryManagementState ', () => {
    it('should return accountSummary state', () => {
      let result: AccountSummaryManagement;
      store
        .pipe(select(AccountSummarySelectors.getAccountSummaryManagementState))
        .subscribe((value) => (result = value));

      store.dispatch(
        new AccountSummaryActions.LoadAccountSummarySuccess([])
      );
      expect(result).toBeTruthy();
    });
  });
});
