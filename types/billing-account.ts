export const BillingAccountFrequency = {
  Weekly: "Weekly",
  Monthly: "Monthly",
} as const;

export type BillingAccountFrequencyValue =
  (typeof BillingAccountFrequency)[keyof typeof BillingAccountFrequency];

export const BillingAccountNotifyOption = {
  None: "None",
  OnlyMe: "OnlyMe",
  AllUsers: "AllUsers",
} as const;

export type BillingAccountNotifyOptionValue =
  (typeof BillingAccountNotifyOption)[keyof typeof BillingAccountNotifyOption];

export const BillingAccountPaymentStatus = {
  Paid: "Paid",
  Voided: "Voided",
} as const;

export type BillingAccountPaymentStatusValue =
  (typeof BillingAccountPaymentStatus)[keyof typeof BillingAccountPaymentStatus];

export interface BillingAccountVendor {
  vendorid: number;
  vendorname: string;
  address?: string;
  isactive?: boolean;
}

export interface BillingAccountOffice {
  accountid: number;
  accountname: string;
  isactive?: boolean;
}

export interface BillingAccountExpenseType {
  expensetypeid: number;
  expensetypedesc: string;
  isactive?: boolean;
}

export interface BillingAccount {
  id: number;
  companyId?: number;
  accountName: string;
  vendorId: number | null;
  officeId: number | null;
  expenseTypeId: number | null;
  hasFixedAmount: boolean;
  amount: number | null;
  frequency: BillingAccountFrequencyValue;
  dueDayOfMonth: number | null;
  dueDayOfWeek: number | null;
  notifyDaysBefore: number;
  notifyOption: BillingAccountNotifyOptionValue;
  isActive: boolean;
  memo: string;
  nextDueDate?: string | null;
  createdById?: number;
  dateCreated?: string | null;
  vendor?: BillingAccountVendor | null;
  office?: BillingAccountOffice | null;
  expenseType?: BillingAccountExpenseType | null;
}

export interface BillingAccountPayment {
  id: number;
  companyId?: number;
  billingAccountId: number;
  expenseId?: number | null;
  amount: number | null;
  paymentDate: string | null;
  periodFrom: string | null;
  periodTo: string | null;
  nextDueDate: string | null;
  refNo: string;
  paymentMode: string;
  usePettyCash: boolean;
  status: BillingAccountPaymentStatusValue;
  remarks: string;
  createdById?: number;
  dateCreated?: string | null;
  billingAccount?: BillingAccount | null;
  expense?: Record<string, unknown> | null;
}

export type BillingAccountFormModel = Omit<
  BillingAccount,
  | "companyId"
  | "createdById"
  | "dateCreated"
  | "vendor"
  | "office"
  | "expenseType"
>;

export type BillingAccountPaymentFormModel = Omit<
  BillingAccountPayment,
  | "id"
  | "companyId"
  | "expenseId"
  | "status"
  | "createdById"
  | "dateCreated"
  | "billingAccount"
  | "expense"
>;
