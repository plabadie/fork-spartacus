import { AuthGuard, CmsConfig } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { BREAKPOINT, TableConfig, TableLayout } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE } from '../constants';

import { ItemService } from '../shared/item.service';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { CellComponent } from '../shared/table/cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { ToggleLinkCellComponent } from './list/toggle-link/toggle-link-cell.component';

// import { AccountSummaryDetailsCellComponent } from './details-cell/account-summary-details-cell.component';
import { AccountSummaryListComponent } from './list/account-summary-list.component';
import { AccountSummaryListService } from './services/account-summary-list.service';
import { AccountSummaryItemService } from './services/account-summary-item.service';
import { AccountSummaryRoutePageMetaResolver } from './services/account-summary-route-page-meta.resolver';
import { AccountSummaryDetailsComponent } from "./details";

import { CkTestComponent } from  './details/cktest.component'

export const accountSummaryCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageAccountSummaryListComponent: {
      component: AccountSummaryListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: AccountSummaryListService,
        },
        {
          provide: ItemService,
          useExisting: AccountSummaryItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgAccountSummary.breadcrumbs.list',
              resolver: AccountSummaryRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: `:${ROUTE_PARAMS.accountSummaryCode}`,
            component: AccountSummaryDetailsComponent,
            data: {
              cxPageMeta: {
                breadcrumb: 'orgAccountSummary.breadcrumbs.details',
              },
            },
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
    ManageAccountSummaryDetailsComponent: {
      component: CkTestComponent,
    }
  },
};


export function accountSummaryTableConfigFactory(): TableConfig {
  return accountSummaryTableConfig;
}

export const accountSummaryTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.UNIT]: {
      cells: ['name'],
      options: {
        layout: TableLayout.VERTICAL,
        cells: {
          name: {
            dataComponent: ToggleLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          uid: {
            dataComponent: CellComponent,
          },
        },
      },
      [BREAKPOINT.lg]: {
        cells: ['name', 'active', 'uid'],
      },
    },
    [OrganizationTableType.ACCOUNT_SUMMARY]: {
      cells: ['document', 'type', 'doc_date', 'due_date', 'original_amount', 'open_amount', 'status', 'attachment' ],
      options: {
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
  },
};
