import { TestBed } from '@angular/core/testing';
import { AccountSummary, Occ } from '@spartacus/core';
import { OccAccountSummaryNormalizer } from "./occ-account-summary-normalizer";

describe('OccAccountSummaryNormalizer', () => {
  let service: OccAccountSummaryNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccAccountSummaryNormalizer],
    });

    service = TestBed.inject(OccAccountSummaryNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.AccountSummary = null;

  describe('convert', () => {
    it('convert Occ.AccountSummary to AccountSummary', () => {
      let target: AccountSummary;
      target = service.convert(source);

      expect(target.accountManagerEmail).toEqual(source.accountManagerEmail);
    });
  });
});
