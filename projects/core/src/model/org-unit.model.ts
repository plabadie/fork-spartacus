import { Address } from './address.model';
import { Currency, DocumentType, User } from './misc.model';

// TODO(#8876): Should we simplify the models only for the fields required by the B2B checkout?
export interface CostCenter {
  active?: boolean;
  code?: string;
  name?: string;
  unit?: B2BUnit;
}

export enum B2BUserRole {
  ADMIN = 'b2badmingroup',
  CUSTOMER = 'b2bcustomergroup',
  MANAGER = 'b2bmanagergroup',
  APPROVER = 'b2bapprovergroup',
}

export interface B2BUnit {
  active?: boolean;
  addresses?: Address[];
  uid?: string;
  name?: string;
}

export interface B2BUser extends User {
  active?: boolean;
}

export interface B2BApprovalProcess {
  code?: string;
  name?: string;
}

export interface OrderApprovalPermissionType {
  code?: string;
  name?: string;
}

export interface AccountSummary {
  unitCode?: string;
  accountManagerEmail?: string;
  accountManagerName?: string;
  amountBalanceData?: {
    currentBalance?: string;
    dueBalance?: {
      additionalProp1?: string;
      additionalProp2?: string;
      additionalProp3?: string;
    },
    openBalance?: string;
    pastDueBalance?: string;
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
