import {
  AccountSummary,
  AccountSummaryDocument,
  ListModel,
  SearchConfig,
  StateUtils,
} from '@spartacus/core';
import {
  ACCOUNT_SUMMARY_DETAILS,
  ACCOUNT_SUMMARY_DOCUMENTS,
  ACCOUNT_SUMMARY_LIST,
} from '../organization-state';

export const LOAD_ACCOUNT_SUMMARY = '[AccountSummary] Load AccountSummary Data';
export const LOAD_ACCOUNT_SUMMARY_FAIL = '[AccountSummary] Load AccountSummary Data Fail';
export const LOAD_ACCOUNT_SUMMARY_SUCCESS = '[AccountSummary] Load AccountSummary Data Success';

export const LOAD_ACCOUNT_SUMMARY_DOCUMENT = '[AccountSummary] Load AccountSummary Document';
export const LOAD_ACCOUNT_SUMMARY_DOCUMENT_FAIL = '[AccountSummary] Load AccountSummary Document Fail';
export const LOAD_ACCOUNT_SUMMARY_DOCUMENT_SUCCESS = '[AccountSummary] Load AccountSummary Document Success';

export const LOAD_ACCOUNT_SUMMARY_DOCUMENTS = '[AccountSummary] Load AccountSummary Documents';
export const LOAD_ACCOUNT_SUMMARY_DOCUMENTS_FAIL = '[AccountSummary] Load AccountSummary Documents Fail';
export const LOAD_ACCOUNT_SUMMARY_DOCUMENTS_SUCCESS = '[AccountSummary] Load AccountSummary Documents Success';

export class LoadAccountSummary extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ACCOUNT_SUMMARY;
  constructor(public payload: { userId: string, unitCode: string }) {
    super(ACCOUNT_SUMMARY_DETAILS, payload.unitCode);
  }
}

export class LoadAccountSummaryFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_FAIL;
  constructor(public payload: { unitCode: string; error: any }) {
    super(ACCOUNT_SUMMARY_DETAILS, payload.unitCode, payload.error);
  }
}

export class LoadAccountSummarySuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_SUCCESS;

  constructor(public payload: AccountSummary | AccountSummary[]) {
    super(
      ACCOUNT_SUMMARY_DETAILS,
      Array.isArray(payload)
        ? payload.map((accountSummary) => accountSummary?.unitCode)
        : payload?.unitCode
    );
  }
}

export class LoadAccountSummaryDocument extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_DOCUMENT;
  constructor(public payload: { userId: string; documentNumber: string }) {
    super(ACCOUNT_SUMMARY_DOCUMENTS, payload.documentNumber);
  }
}

export class LoadAccountSummaryDocumentFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_DOCUMENT_FAIL;
  constructor(public payload: { documentNumber: string; error: any }) {
    super(ACCOUNT_SUMMARY_DOCUMENTS, payload.documentNumber, payload.error);
  }
}

export class LoadAccountSummaryDocumentSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_DOCUMENT_SUCCESS;

  constructor(public payload: AccountSummaryDocument | AccountSummaryDocument[]) {
    super(
      ACCOUNT_SUMMARY_DOCUMENTS,
      Array.isArray(payload)
        ? payload.map((document) => document?.documentNumber)
        : payload?.documentNumber
    );
  }
}


export class LoadAccountSummaryDocuments extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_DOCUMENTS;
  constructor(
    public payload: {
      userId: string;
      params: SearchConfig;
    }
  ) {
    super(ACCOUNT_SUMMARY_LIST, StateUtils.serializeSearchConfig(payload.params));
  }
}

export class LoadAccountSummaryDocumentsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_DOCUMENTS_FAIL;
  constructor(public payload: { params: SearchConfig; error: any }) {
    super(
      ACCOUNT_SUMMARY_LIST,
      StateUtils.serializeSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadAccountSummaryDocumentsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ACCOUNT_SUMMARY_DOCUMENTS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(ACCOUNT_SUMMARY_LIST, StateUtils.serializeSearchConfig(payload.params));
  }
}

export type AccountSummaryActions =
  | LoadAccountSummary
  | LoadAccountSummaryFail
  | LoadAccountSummarySuccess
  | LoadAccountSummaryDocument
  | LoadAccountSummaryDocumentFail
  | LoadAccountSummaryDocumentSuccess
  | LoadAccountSummaryDocuments
  | LoadAccountSummaryDocumentsFail
  | LoadAccountSummaryDocumentsSuccess;
