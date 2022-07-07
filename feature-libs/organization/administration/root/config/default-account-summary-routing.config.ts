import { ParamsMapping, RoutingConfig } from '@spartacus/core';
import { ROUTE_PARAMS } from '../route-params';
const listPath = `organization/account-summary/:${ROUTE_PARAMS.accountSummaryCode}`;

const paramsMapping: ParamsMapping = {
  accountSummaryCode: 'uid',
};

export const defaultAccountSummaryRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgAccountSummary: {
        paths: ['organization/account-summary'],
      },
      orgAccountSummaryDetails: {
        paths: [listPath],
        paramsMapping,
      },
    },
  },
};
