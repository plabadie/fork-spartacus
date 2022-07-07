import { Injectable } from '@angular/core';
import {
  AccountSummaryDocument,
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';

import { ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccAccountSummaryDocumentListNormalizer
  implements Converter<Occ.AccountSummaryList, EntitiesModel<AccountSummaryDocument>>
{
  constructor(private converter: ConverterService) {}

  convert(source: Occ.AccountSummaryList, target?: EntitiesModel<AccountSummaryDocument>): EntitiesModel<AccountSummaryDocument> {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.values = source.documents.map((document) => ({
      ...this.converter.convert(document, ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER),
    }));

    return target;
  }
}
