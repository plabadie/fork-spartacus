import { TestBed } from '@angular/core/testing';
import { AccountSummaryDocument, Occ } from '@spartacus/core';
import { OccAccountSummaryDocumentNormalizer } from "./occ-account-summary-document-normalizer";

describe('OccAccountSummaryNormalizer', () => {
  let service: OccAccountSummaryDocumentNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccAccountSummaryDocumentNormalizer],
    });

    service = TestBed.inject(OccAccountSummaryDocumentNormalizer);
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
