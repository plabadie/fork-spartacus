import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import { RoutingService, TranslationService } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-commerce-quotes-list',
  templateUrl: './commerce-quotes-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesListComponent implements OnInit, OnDestroy {
  quotesRes = {
    pagination: {
      currentPage: 0,
      pageSize: 20,
      sort: 'byCode',
      totalPages: 1,
      totalResults: 1,
    },
    sorts: [
      { code: 'byDate' },
      { code: 'byCode' },
      { code: 'byName' },
      { code: 'byState' },
    ],
    quotes: [
      {
        code: '00000001',
        name: 'Quote 00000001',
        state: 'BUYER_DRAFT',
        updatedTime: '2022-04-11T11:28:48+0000',
      },
    ],
  };

  quotes$ = of(this.quotesRes);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    protected routing: RoutingService,
    protected translationService: TranslationService
  ) {}

  ngOnInit(): void {}

  getSortLabels(): Observable<{ [key: string]: string }> {
    return combineLatest([
      this.translationService.translate('sorting.date'),
      this.translationService.translate('sorting.quoteId'),
      this.translationService.translate('sorting.name'),
      this.translationService.translate('sorting.status'),
    ]).pipe(
      map(
        ([
          textByQuoteUpdatedDate,
          textByQuoteCode,
          textByQuoteName,
          textByQuoteStatus,
        ]) => {
          return {
            byDate: textByQuoteUpdatedDate,
            byCode: textByQuoteCode,
            byName: textByQuoteName,
            byState: textByQuoteStatus,
          };
        }
      )
    );
  }

  changeSortCode(sortCode: string): void {
    console.log(sortCode);
    throw new Error(`Method not implemented.`);
  }

  goToQuoteDetails(cart: Cart): void {
    this.routing.go({
      cxRoute: 'quoteDetails',
      params: { savedCartId: cart?.code },
    });
  }

  ngOnDestroy(): void {}
}
