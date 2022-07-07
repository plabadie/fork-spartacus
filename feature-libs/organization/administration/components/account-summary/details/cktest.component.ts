import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  // B2BUnit,
  AccountSummaryDocument,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { AccountSummaryItemService } from '../services/account-summary-item.service';

@Component({
  selector: 'ck-test',
  templateUrl: './cktest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: AccountSummaryItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class CkTestComponent {
  model$: Observable<AccountSummaryDocument> = this.itemService.key$.pipe(
    switchMap((code) => {
      console.log('calling itemServicie with code: ', code);
      return this.itemService.load(code);
    }),
    startWith({})
  );
  isInEditMode$ = this.itemService.isInEditMode$;

  constructor(protected itemService: ItemService<AccountSummaryDocument>) {}

  ngOnInit() {
    this.itemService.getRouterParam('accountSummaryCode').subscribe(abc => console.log('abc1 is ', abc));
    this.model$.subscribe(m => console.log('m is:', m));
  }
}
