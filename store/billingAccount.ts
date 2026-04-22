import { defineStore } from "pinia";
import { api } from "~/components/api/BaseAPIService";
import type {
  BillingAccount,
  BillingAccountPayment,
} from "~/types/billing-account";

function unwrapPayload<T>(response: any, fallback: T): T {
  if (response === undefined || response === null) return fallback;
  if (response.data !== undefined) return response.data as T;
  return response as T;
}

export const useBillingAccountStore = defineStore("billingAccount", () => {
  const billingAccounts = ref<BillingAccount[]>([]);
  const billingPayments = ref<BillingAccountPayment[]>([]);
  const currentBillingAccount = ref<BillingAccount | null>(null);

  async function getBillingAccounts(
    params: {
      viewAll?: boolean;
      search?: string;
    } = {},
  ) {
    const response = await api.request(`/billingaccount/getall`, "GET", {
      viewAll: params.viewAll ?? false,
      search: params.search ?? "",
    });

    const payload = unwrapPayload<
      BillingAccount[] | { data?: BillingAccount[] }
    >(response, []);

    billingAccounts.value = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : [];

    return billingAccounts.value;
  }

  async function getBillingAccount(id: number) {
    const response = await api.request(`/billingaccount/${id}`, "GET");
    currentBillingAccount.value = unwrapPayload<BillingAccount | null>(
      response,
      null,
    );
    return currentBillingAccount.value;
  }

  async function createBillingAccount(params: object) {
    const response = await api.request(`/billingaccount`, "POST", params);
    const payload = unwrapPayload<BillingAccount | null>(response, null);
    if (payload) currentBillingAccount.value = payload;
    return payload;
  }

  async function updateBillingAccount(params: object) {
    const response = await api.request(`/billingaccount`, "PUT", params);
    const payload = unwrapPayload<BillingAccount | null>(response, null);
    if (payload) currentBillingAccount.value = payload;
    return payload;
  }

  async function setBillingAccountStatus(id: number, isActive: boolean) {
    return await api.request(
      `/billingaccount/${id}/status?isActive=${isActive}`,
      "PATCH",
    );
  }

  async function getBillingAccountPayments(billingAccountId: number) {
    const response = await api.request(
      `/billingaccount/${billingAccountId}/payments`,
      "GET",
    );
    const payload = unwrapPayload<
      BillingAccountPayment[] | { data?: BillingAccountPayment[] }
    >(response, []);

    billingPayments.value = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : [];

    return billingPayments.value;
  }

  async function createBillingAccountPayment(params: object) {
    const response = await api.request(
      `/billingaccount/payments`,
      "POST",
      params,
    );
    return unwrapPayload<BillingAccountPayment | null>(response, null);
  }

  async function voidBillingAccountPayment(id: number) {
    return await api.request(`/billingaccount/payments/${id}/void`, "PATCH");
  }

  return {
    billingAccounts,
    billingPayments,
    currentBillingAccount,
    getBillingAccounts,
    getBillingAccount,
    createBillingAccount,
    updateBillingAccount,
    setBillingAccountStatus,
    getBillingAccountPayments,
    createBillingAccountPayment,
    voidBillingAccountPayment,
  };
});
