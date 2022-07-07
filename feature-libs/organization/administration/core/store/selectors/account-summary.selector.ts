import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  AccountSummary,
  AccountSummaryDocument,
  EntitiesModel,
  StateUtils,
  SearchConfig,
} from '@spartacus/core';

import {
  AccountSummaryManagement,
  ACCOUNT_SUMMARY_FEATURE,
  OrganizationState,
  StateWithOrganization,
} from '../organization-state';
import { getOrganizationState } from './feature.selector';

export const getAccountSummaryManagementState: MemoizedSelector<
  StateWithOrganization,
  AccountSummaryManagement
  > = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state[ACCOUNT_SUMMARY_FEATURE]
);

export const getAccountSummaryDetailsState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<AccountSummary>
  > = createSelector(
  getAccountSummaryManagementState,
  (state: AccountSummaryManagement) => state && state.details
);

export const getAccountSummaryState: MemoizedSelector<
  StateWithOrganization,
  StateUtils.EntityLoaderState<AccountSummaryDocument>
  > = createSelector(
  getAccountSummaryManagementState,
  (state: AccountSummaryManagement) => state && state.entities
);

export const getAccountSummaryDetails = (
  unitCode: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<AccountSummary>> =>
  createSelector(
    getAccountSummaryDetailsState,
    (state: StateUtils.EntityLoaderState<AccountSummary>) =>
      StateUtils.entityLoaderStateSelector(state, unitCode)
  );

export const getAccountSummaryDocument = (
  documentNumber: string
): MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<AccountSummaryDocument>> =>
  createSelector(
    getAccountSummaryState,
    (state: StateUtils.EntityLoaderState<AccountSummaryDocument>) =>
      StateUtils.entityLoaderStateSelector(state, documentNumber)
  );

export const getAccountSummaryValue = (
  documentNumber: string
): MemoizedSelector<StateWithOrganization, AccountSummaryDocument> => {
  return createSelector(getAccountSummaryDocument(documentNumber), (accountSummaryState) =>
    StateUtils.loaderValueSelector(accountSummaryState)
  );
};

export const getAccountSummaryDocumentList = (
  params: SearchConfig
): MemoizedSelector<
  StateWithOrganization,
  StateUtils.LoaderState<EntitiesModel<AccountSummaryDocument>>
  > =>
  createSelector(getAccountSummaryManagementState, (state: AccountSummaryManagement) =>
    StateUtils.denormalizeSearch<AccountSummaryDocument>(state, params)
  );
