import { TestBed } from '@angular/core/testing';
import { AccountSummaryDocument, Occ } from '@spartacus/core';
import { OccAccountSummaryDocumentListNormalizer } from "./occ-account-summary-document-list-normalizer";

describe('OccAccountSummaryDocumentListNormalizer', () => {
  let service: OccAccountSummaryDocumentListNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccAccountSummaryDocumentListNormalizer],
    });

    service = TestBed.inject(OccAccountSummaryDocumentListNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.AccountSummaryDocument = null;

  describe('convert', () => {
    it('convert Occ.AccountSummary to AccountSummary', () => {
      let target: AccountSummaryDocument;
      target = service.convert(source);

      expect(target.documentNumber).toEqual(source.documentNumber);
    });
  });
});
