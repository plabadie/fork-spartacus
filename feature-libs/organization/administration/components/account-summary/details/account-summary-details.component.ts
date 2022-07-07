import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountSummary } from '@spartacus/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { AccountSummaryItemService } from '../services/account-summary-item.service';

@Component({
  selector: 'cx-account-summary-unit-details',
  templateUrl: './account-summary-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ItemService,
      useExisting: AccountSummaryItemService,
    },
  ],
  host: { class: 'content-wrapper' },
})
export class AccountSummaryDetailsComponent {
  model$: Observable<AccountSummary> = this.itemService.key$.pipe(
    switchMap((code) => this.itemService.load(code)),
    startWith({})
  );
  isInEditMode$ = this.itemService.isInEditMode$;

  constructor(protected itemService: ItemService<AccountSummary>) {}
}
