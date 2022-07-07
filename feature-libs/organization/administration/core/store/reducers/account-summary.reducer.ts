import { AccountSummary, AccountSummaryDocument, StateUtils } from '@spartacus/core';
// import { AccountSummaryNode } from '../../model/account-summary-node.model';
import { AccountSummaryActions } from '../actions/index';

export const accountSummaryInitialState = undefined;

export function accountSummaryDetailsReducer(
  state: AccountSummary = accountSummaryInitialState,
  action: StateUtils.LoaderAction
): AccountSummary {
  switch (action.type) {
    case AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_SUCCESS:
      return action.payload;
  }
  return state;
}

export function accountSummaryEntitiesReducer(
  state: AccountSummaryDocument = accountSummaryInitialState,
  action: StateUtils.LoaderAction
): AccountSummaryDocument {
  switch (action.type) {
    case AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_DOCUMENT_SUCCESS:
      return action.payload;
  }
  return state;
}

export function accountSummaryListReducer(
  state = accountSummaryInitialState,
  action: StateUtils.LoaderAction
): any {
  switch (action.type) {
    case AccountSummaryActions.LOAD_ACCOUNT_SUMMARY_DOCUMENTS_SUCCESS:
      return action.payload.page;
  }
  return state;
}
