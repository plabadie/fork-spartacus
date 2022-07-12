import { ListNavigationModule } from '@spartacus/storefront';
import { CommerceQuotesListModule } from './commerce-quotes-list/commerce-quotes-list.module';
import { CommerceQuotesDetailsOverviewModule } from './details/overview/commerce-quotes-details-overview.module';
import { CommerceQuotesRequestQuoteButtonModule } from './commerce-quotes-request-quote-button/commerce-quotes-request-quote-button.module';
import { CommerceQuotesRequestQuoteDialogModule } from './commerce-quotes-request-quote-dialog/commerce-quotes-request-quote-dialog.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    CommerceQuotesListModule,
    CommerceQuotesDetailsOverviewModule,
    CommerceQuotesRequestQuoteButtonModule,
    CommerceQuotesRequestQuoteDialogModule,
    ListNavigationModule,
  ],
})
export class CommerceQuotesComponentsModule {}