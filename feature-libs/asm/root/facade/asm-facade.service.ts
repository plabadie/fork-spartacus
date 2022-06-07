import { Injectable } from '@angular/core';
import { facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ASM_FEATURE } from '../feature-name';
import { BindCartOptions } from '../model/bind-cart.model';
import { CustomerListsPage } from '../model/customer-lists-page.model';
import { CustomerSearchOptions } from '../model/customer-search-options.model';
import { CustomerSearchPage } from '../model/customer-search-page.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AsmFacadeService,
      feature: ASM_FEATURE,
      methods: ['getCustomerLists', 'getCustomers'],
    }),
})
export abstract class AsmFacadeService {
  abstract bindCart(options: BindCartOptions): Observable<unknown>;

  abstract getCustomerLists(): Observable<QueryState<CustomerListsPage>>;

  abstract getCustomers(
    options?: CustomerSearchOptions
  ): Observable<CustomerSearchPage>;
}
