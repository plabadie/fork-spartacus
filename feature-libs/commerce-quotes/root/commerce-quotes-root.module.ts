import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { CommerceQuotesEventModule } from './events/commerce-quotes-event.module';
import { COMMERCE_QUOTES_FEATURE } from './feature-name';

export function defaultCommerceQuotesComponentsConfig() {
  const config = {
    featureModules: {
      [COMMERCE_QUOTES_FEATURE]: {
        cmsComponents: [
          'AccountMyQuotesComponent',
          'CommerceQuotesRequestComponent',
          'CommerceQuotesDetailsOverviewComponent',
        ],
      },
    },
  };
  return config;
}

export const defaultCommerceQuotesRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      quotes: {
        paths: ['my-account/quotes'],
      },
      quoteDetails: {
        paths: ['my-account/quote/:quoteId'],
        paramsMapping: { quoteId: 'quoteId' },
      },
      quoteEdit: {
        paths: ['my-account/quotes/:quoteId/edit'],
        paramsMapping: { quoteId: 'quoteId' },
      },
    },
  },
};

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'quotes',
        },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'quoteDetails',
        },
      },
    ]),
    CommerceQuotesEventModule,
  ],
  providers: [
    provideDefaultConfigFactory(defaultCommerceQuotesComponentsConfig),
    provideDefaultConfig(defaultCommerceQuotesRoutingConfig),
  ],
})
export class CommerceQuotesRootModule {}