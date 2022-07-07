import { TestBed } from '@angular/core/testing';
import { B2BUnit, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentAccountSummaryService } from './current-account-summary.service';
import { AccountSummaryRoutePageMetaResolver } from './account-summary-route-page-meta.resolver';

class MockCurrentItemService implements Partial<CurrentAccountSummaryService> {
  item$: Observable<B2BUnit> = of({ name: 'testName' });
}

describe('AccountSummaryRoutePageMetaResolver', () => {
  let resolver: AccountSummaryRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentAccountSummaryService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(AccountSummaryRoutePageMetaResolver);
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
    ).toEqual([{ label: 'testTranslation name:testName', link: 'testPath' }]);
  });
});
