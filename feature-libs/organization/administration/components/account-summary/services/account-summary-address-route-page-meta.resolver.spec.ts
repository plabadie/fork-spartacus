import { TestBed } from '@angular/core/testing';
import { Address, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentAccountSummaryAddressService } from '../links/addresses/services/current-account-summary-address.service';
import { AccountSummaryAddressRoutePageMetaResolver } from './account-summary-address-route-page-meta.resolver';

class MockCurrentItemService implements Partial<CurrentAccountSummaryAddressService> {
  item$: Observable<Address> = of({ formattedAddress: 'testAddress' });
}

describe('AccountSummaryAddressRoutePageMetaResolver', () => {
  let resolver: AccountSummaryAddressRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentAccountSummaryAddressService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(AccountSummaryAddressRoutePageMetaResolver);
  });

  it('should emit breadcrumb with translated i18n key, using current item as params', async () => {
    expect(
      await resolver
        .resolveBreadcrumbs({
          url: 'testPath',
          pageMetaConfig: { breadcrumb: { i18n: 'testTranslation' } },
        })
        .pipe(take(1))
        .toPromise()
    ).toEqual([
      {
        label: 'testTranslation formattedAddress:testAddress',
        link: 'testPath',
      },
    ]);
  });
});
