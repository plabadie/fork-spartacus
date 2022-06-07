import {
  BindCartOptions,
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { Observable } from 'rxjs';

export abstract class AsmAdapter {
  /**
   * Abstract function used to search for customers.
   */
  abstract customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;

  abstract bindCart(options: BindCartOptions): Observable<unknown>;

  /**
   * Abstract function used to get customer lists.
   */
  abstract customerLists(): Observable<CustomerListsPage>;
}
