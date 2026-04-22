import {
  BillingAccountFrequency,
  BillingAccountNotifyOption,
  type BillingAccount,
  type BillingAccountFormModel,
  type BillingAccountPaymentFormModel,
} from "~/types/billing-account";

export const billingAccountFrequencyOptions = [
  { label: "Weekly", value: BillingAccountFrequency.Weekly },
  { label: "Monthly", value: BillingAccountFrequency.Monthly },
];

export const billingAccountWeekdayOptions = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export const billingAccountPaymentModeOptions = [
  { label: "Cash", value: "Cash" },
  { label: "Check", value: "Check" },
  { label: "Bank Transfer", value: "Bank Transfer" },
  { label: "E-Wallet", value: "E-Wallet" },
];

export function createEmptyBillingAccountForm(): BillingAccountFormModel {
  return {
    id: 0,
    accountName: "",
    vendorId: null,
    officeId: null,
    expenseTypeId: null,
    hasFixedAmount: false,
    amount: null,
    frequency: BillingAccountFrequency.Monthly,
    dueDayOfMonth: 1,
    dueDayOfWeek: null,
    notifyDaysBefore: 0,
    notifyOption: BillingAccountNotifyOption.OnlyMe,
    isActive: true,
    memo: "",
  };
}

export function createBillingAccountFormFromRecord(
  account: BillingAccount,
): BillingAccountFormModel {
  return {
    id: account.id,
    accountName: account.accountName,
    vendorId: account.vendorId,
    officeId: account.officeId,
    expenseTypeId: account.expenseTypeId,
    hasFixedAmount: account.hasFixedAmount,
    amount: account.amount,
    frequency: account.frequency,
    dueDayOfMonth: account.dueDayOfMonth,
    dueDayOfWeek: account.dueDayOfWeek,
    notifyDaysBefore: account.notifyDaysBefore,
    notifyOption: account.notifyOption,
    isActive: account.isActive,
    memo: account.memo ?? "",
  };
}

export function createEmptyBillingAccountPaymentForm(
  billingAccountId: number,
): BillingAccountPaymentFormModel {
  const today = formatDateForInput(new Date());

  return {
    billingAccountId,
    amount: null,
    paymentDate: today,
    periodFrom: today,
    periodTo: today,
    nextDueDate: null,
    refNo: "",
    paymentMode: "Cash",
    usePettyCash: false,
    remarks: "",
  };
}

export function formatDateForInput(value: Date | string | null | undefined) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function computeDefaultPaymentPeriod(account: BillingAccount): {
  periodFrom: string | null;
  periodTo: string | null;
} {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If the account has a stored nextDueDate and it's in the future, use it as the periodTo base
  const storedNextDue = account.nextDueDate
    ? new Date(account.nextDueDate)
    : null;
  const useStoredDue =
    storedNextDue &&
    !Number.isNaN(storedNextDue.getTime()) &&
    storedNextDue > today;

  if (account.frequency === BillingAccountFrequency.Monthly) {
    const dueDay = account.dueDayOfMonth ?? 1;

    let periodTo: Date;
    if (useStoredDue) {
      periodTo = storedNextDue!;
    } else {
      // Coverage To: current month's due day, clamped to last day of current month
      const year = today.getFullYear();
      const month = today.getMonth(); // 0-indexed
      const lastDayOfToMonth = new Date(year, month + 1, 0).getDate();
      periodTo = new Date(year, month, Math.min(dueDay, lastDayOfToMonth));
    }

    // Coverage From: one month before periodTo, same day clamped
    const fromMonth = periodTo.getMonth() === 0 ? 11 : periodTo.getMonth() - 1;
    const fromYear =
      periodTo.getMonth() === 0
        ? periodTo.getFullYear() - 1
        : periodTo.getFullYear();
    const lastDayOfFromMonth = new Date(fromYear, fromMonth + 1, 0).getDate();
    const periodFrom = new Date(
      fromYear,
      fromMonth,
      Math.min(dueDay, lastDayOfFromMonth),
    );

    return {
      periodFrom: formatDateForInput(periodFrom),
      periodTo: formatDateForInput(periodTo),
    };
  }

  // Weekly
  let periodTo: Date;
  if (useStoredDue) {
    periodTo = new Date(storedNextDue!);
  } else {
    // Coverage To = most recent occurrence of dueDayOfWeek (on or before today)
    const targetDay = account.dueDayOfWeek ?? 0;
    periodTo = new Date(today);
    const diff = (periodTo.getDay() - targetDay + 7) % 7;
    periodTo.setDate(periodTo.getDate() - diff);
  }

  // Coverage From: 7 days before coverage to
  const periodFrom = new Date(periodTo);
  periodFrom.setDate(periodFrom.getDate() - 7);

  return {
    periodFrom: formatDateForInput(periodFrom),
    periodTo: formatDateForInput(periodTo),
  };
}

export function computeNextDueDate(account: BillingAccount, fromDate: string) {
  const baseDate = new Date(fromDate);
  if (Number.isNaN(baseDate.getTime())) return null;

  if (account.frequency === BillingAccountFrequency.Monthly) {
    const dueDay = account.dueDayOfMonth ?? 1;
    const targetYear = baseDate.getFullYear();
    const targetMonth = baseDate.getMonth() + 1;
    const lastDayOfTargetMonth = new Date(
      targetYear,
      targetMonth + 1,
      0,
    ).getDate();
    const nextDate = new Date(
      targetYear,
      targetMonth,
      Math.min(dueDay, lastDayOfTargetMonth),
    );
    return formatDateForInput(nextDate);
  }

  const targetDay = account.dueDayOfWeek ?? 0;
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + 7);
  return formatDateForInput(nextDate);
}
