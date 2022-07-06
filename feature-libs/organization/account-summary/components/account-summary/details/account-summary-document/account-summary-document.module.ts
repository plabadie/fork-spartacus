import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideDefaultConfig, UrlModule } from '@spartacus/core';
import { AccountSummaryDocumentComponent } from './account-summary-document.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AccountSummaryDocumentComponent],
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    AgGridModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountSummaryDocumentComponent: {
          component: AccountSummaryDocumentComponent,
        },
      },
    }),
  ],
})
export class AccountSummaryDocumentModule { }
