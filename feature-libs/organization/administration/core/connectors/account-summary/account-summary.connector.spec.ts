import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {AccountSummaryAdapter} from './account-summary.adapter';
import {AccountSummaryConnector} from './account-summary.connector';
import createSpy = jasmine.createSpy;

const userId = 'userId';

const accountSummary = {
  uid: '123',
};

class MockAccountSummaryAdapter implements AccountSummaryAdapter {
  load = createSpy('load').and.returnValue(of(accountSummary));
}

describe('AccountSummaryConnector', () => {
  let service: AccountSummaryConnector;
  let adapter: AccountSummaryAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountSummaryConnector,
        { provide: AccountSummaryAdapter, useClass: MockAccountSummaryAdapter },
      ],
    });

    service = TestBed.inject(AccountSummaryConnector);
    adapter = TestBed.inject(AccountSummaryAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load accountSummary', () => {
    service.get(userId);
    expect(adapter.load).toHaveBeenCalledWith(userId);
  });
});
