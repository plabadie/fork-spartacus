import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import {
  AccountSummary,
  normalizeHttpError,
  OccConfig,
} from '@spartacus/core';
import {
  AccountSummaryActions,
  AccountSummaryConnector,
} from '@spartacus/organization/administration/core';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Observable, of, throwError } from 'rxjs';
import { defaultOccOrganizationConfig } from '../../../occ/config/default-occ-organization-config';
import * as fromEffects from './account-summary.effect';

import createSpy = jasmine.createSpy;

const httpErrorResponse = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
  status: 500,
  statusText: 'Unknown error',
  url: '/xxx',
});
const error = normalizeHttpError(httpErrorResponse);
const userId = 'testUser';

const orgUnit: Partial<AccountSummary> = { id: userId };

class MockAcountSummaryConnector {
  get = createSpy().and.returnValue(of(orgUnit));
}

describe('AccountSummary Effects', () => {
  let actions$: Observable<AccountSummaryActions.AccountSummaryActions>;
  let accountSummaryConnector: AccountSummaryConnector;
  let effects: fromEffects.AccountSummaryEffects;
  let expected: TestColdObservable;

  const mockAccountSummaryState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: orgUnit },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ orgUnit: () => mockAccountSummaryState }),
      ],
      providers: [
        { provide: AccountSummaryConnector, useClass: MockAcountSummaryConnector },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.AccountSummaryEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.AccountSummaryEffects);
    accountSummaryConnector = TestBed.inject(AccountSummaryConnector);
    expected = null;
  });

  describe('load$', () => {
    // TODO: unlock after use final addresses endpoint
    xit('should return LoadAccountSummarySuccess action', () => {
      const action = new AccountSummaryActions.LoadAccountSummary({ userId });
      const completion = new AccountSummaryActions.LoadAccountSummarySuccess([userId]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.load$).toBeObservable(expected);
      expect(accountSummaryConnector.get).toHaveBeenCalledWith(userId);
    });

    it('should return LoadAccountSummaryFail action if orgUnit not updated', () => {
      accountSummaryConnector.get = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new AccountSummaryActions.LoadAccountSummary({ userId });
      const completion = new AccountSummaryActions.LoadAccountSummaryFail({
        id: userId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.load$).toBeObservable(expected);
      expect(accountSummaryConnector.get).toHaveBeenCalledWith(userId);
    });
  });
});
