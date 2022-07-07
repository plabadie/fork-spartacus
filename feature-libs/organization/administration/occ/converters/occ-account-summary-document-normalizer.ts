import { Injectable } from '@angular/core';
import { AccountSummaryDocument, Converter, Occ } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccAccountSummaryDocumentNormalizer implements Converter<Occ.AccountSummaryDocument, AccountSummaryDocument> {
  convert(source: Occ.AccountSummaryDocument, target?: AccountSummaryDocument): AccountSummaryDocument {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.selectable = this.normalizeBoolean(source.selectable);

    return target;
  }

  /**
   * Returns the boolean value for a string property that is supposed
   * to be of type boolean.
   */
  protected normalizeBoolean(property: string | boolean): boolean {
    return typeof property === 'string' ? property === 'true' : property;
  }
}
