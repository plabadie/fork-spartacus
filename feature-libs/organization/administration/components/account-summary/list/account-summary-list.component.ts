import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountSummaryTreeService } from '../services/account-summary-tree.service';

@Component({
  selector: 'cx-org-account-summary-list',
  templateUrl: './account-summary-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSummaryListComponent {
  constructor(protected unitTreeService: AccountSummaryTreeService) {}

  expandAll() {
    this.unitTreeService.expandAll();
  }

  collapseAll() {
    this.unitTreeService.collapseAll();
  }
}
