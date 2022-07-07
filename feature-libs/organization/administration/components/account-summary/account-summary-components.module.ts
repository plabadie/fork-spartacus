import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { AccountSummaryListModule } from './list/account-summary-list.module';
import { accountSummaryCmsConfig, accountSummaryTableConfigFactory } from './account-summary.config';
import { UnitListModule } from "../unit/list/unit-list.module";

@NgModule({
  imports: [
    RouterModule,
    AccountSummaryListModule,
    UnitListModule,
  ],
  providers: [
    provideDefaultConfig(accountSummaryCmsConfig),
    provideDefaultConfigFactory(accountSummaryTableConfigFactory),
  ],
})
export class AccountSummaryComponentsModule {}
