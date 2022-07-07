import { Injectable } from '@angular/core';
import { AccountSummary, Converter, Occ } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccAccountSummaryNormalizer implements Converter<Occ.AccountSummary, AccountSummary> {
  convert(source: Occ.AccountSummary, target?: AccountSummary): AccountSummary {
    if (target === undefined) {
      target = { ...(source as any) };
    }

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
