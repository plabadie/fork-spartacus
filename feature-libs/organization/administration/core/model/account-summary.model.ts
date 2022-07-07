import { Currency, DocumentType } from '@spartacus/core';

export interface AccountSummary {
  unitCode: string;
  accountManagerEmail: string;
  accountManagerName: string;
  amountBalanceData: {
    currentBalance: string;
    dueBalance: {
      additionalProp1: string;
      additionalProp2: string;
      additionalProp3: string;
    },
    openBalance: string;
    pastDueBalance: string;
  },
}

export interface AccountSummaryDocument {
  amount?: number;
  currency?: Currency;
  date?: Date;
  documentNumber?: string;
  documentType?: DocumentType;
  formattedAmount?: string;
  formattedOpenAmount?: string;
  openAmount?: number;
  selectable?: boolean;
  status?: string;
}
