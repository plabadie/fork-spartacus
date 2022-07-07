import { InjectionToken } from '@angular/core';
import { AccountSummary, AccountSummaryDocument, Converter, EntitiesModel } from '@spartacus/core';

export const ACCOUNT_SUMMARY_NORMALIZER = new InjectionToken<Converter<any, AccountSummary>>(
  'AccountSummaryNormalizer'
);
export const ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER = new InjectionToken<Converter<any, AccountSummaryDocument>>(
  'AccountSummaryDocumentNormalizer'
);
export const ACCOUNT_SUMMARY_DOCUMENTS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<AccountSummaryDocument>>
  >('AccountSummaryDocumentListNormalizer');
