import { OccConfig } from '@spartacus/core';

export const defaultOccAccountSummaryConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        orgAccountSummary: '/users/${userId}/accountSummary',
      },
    },
  },
};
