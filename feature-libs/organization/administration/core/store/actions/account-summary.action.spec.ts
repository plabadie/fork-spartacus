import {
  AccountSummary,
  StateUtils,
} from '@spartacus/core';
import { ACCOUNT_SUMMARY_ENTITIES } from '../organization-state';
import { AccountSummaryActions } from './index';

const userId = 'xxx@xxx.xxx';
const error = 'anError';

describe('AccountSummary Actions', () => {
  describe('LoadAccountSummary Actions', () => {
    describe('LoadAccountSummary', () => {
      it('should create the action', () => {
        const action = new AccountSummaryActions.LoadAccountSummary({
          userId,
        });

        expect({ ...action }).toEqual({
          type: AccountSummaryActions.LOAD_ACCOUNT_SUMMARY,
          payload: { userId },
          meta: StateUtils.entityLoadMeta(ACCOUNT_SUMMARY_ENTITIES, userId),
        });
      });
    });

    describe('LoadAccountSummaryFail', () => {
      it('should create the action', () => {
        const action = new AccountSummaryActions.LoadAccountSummaryFail({ id: userId, error });

        expect({ ...action }).toEqual({
          type: AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_FAIL,
          payload: { id: userId, error },
          meta: StateUtils.entityFailMeta(ACCOUNT_SUMMARY_ENTITIES, userId, error),
        });
      });
    });

    describe('LoadAccountSummarySuccess', () => {
      it('should create the action', () => {
        const action = new AccountSummaryActions.LoadAccountSummarySuccess([userId]);

        expect({ ...action }).toEqual({
          type: AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_SUCCESS,
          payload: [userId],
          meta: StateUtils.entitySuccessMeta(ACCOUNT_SUMMARY_ENTITIES, [userId]),
        });
      });
    });
  });
});
