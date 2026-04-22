<script setup lang="ts">
import { onMounted, ref } from "vue";
import { navigateTo, useNuxtApp } from "#imports";
import { useBillingAccountStore } from "~/store/billingAccount";
import type { BillingAccount } from "~/types/billing-account";

import { weekdayLabelMap } from "~/utils/date";
import EmptyState from "~/components/ui/EmptyState.vue";

defineOptions({
  name: "BillingAccountsIndexPage",
});

const { $toastNotification } = useNuxtApp();
const billingAccountStore = useBillingAccountStore();

const billingAccounts = ref<BillingAccount[]>([]);
const search = ref("");
const viewAll = ref(false);
const isLoadingList = ref(false);

onMounted(() => {
  loadBillingAccounts();
});

async function loadBillingAccounts() {
  isLoadingList.value = true;

  try {
    billingAccounts.value = await billingAccountStore.getBillingAccounts({
      search: search.value,
      viewAll: viewAll.value,
    });
  } catch (error: any) {
    $toastNotification(
      "error",
      "Billing Accounts",
      error.message ?? "Failed to load billing accounts.",
    );
  }

  isLoadingList.value = false;
}

function getDueSchedule(account: BillingAccount) {
  if (account.frequency === "Monthly") {
    return `Day ${account.dueDayOfMonth ?? "-"}`;
  }

  return weekdayLabelMap.get(account.dueDayOfWeek ?? -1) ?? "-";
}

function goToNewBillingAccount() {
  navigateTo("/billing-accounts/new");
}

function editBillingAccount(id: number) {
  navigateTo(`/billing-accounts/${id}`);
}
</script>

<template>
  <NuxtLayout name="admin" title="Billing Accounts">
    <div class="mx-4 mt-4 space-y-4">
      <Card>
        <template #content>
          <div
            class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"
          >
            <div
              class="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto] lg:w-2/3"
            >
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700"
                  >Search</label
                >
                <InputText
                  v-model.trim="search"
                  fluid
                  placeholder="Search by account or vendor"
                  size="small"
                  @keyup.enter="loadBillingAccounts"
                />
              </div>

              <div class="flex items-center gap-3 pt-8">
                <Checkbox
                  v-model="viewAll"
                  binary
                  input-id="billing-account-view-all"
                  size="small"
                  @update:model-value="loadBillingAccounts"
                />
                <label
                  for="billing-account-view-all"
                  class="text-sm text-gray-700"
                  >Include inactive</label
                >
              </div>

              <div class="flex items-end">
                <Button
                  label="Search"
                  fluid
                  size="small"
                  @click="loadBillingAccounts"
                />
              </div>
            </div>

            <Button
              label="New Billing Account"
              icon="pi pi-plus"
              size="small"
              @click="goToNewBillingAccount"
            />
          </div>
        </template>
      </Card>

      <!-- Loading skeleton -->
      <div v-if="isLoadingList" class="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div
          v-for="n in 8"
          :key="n"
          class="animate-pulse rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
        >
          <div class="mb-4 h-3 w-2/3 rounded bg-gray-200" />
          <div class="mb-2 h-2 w-1/3 rounded bg-gray-100" />
          <div class="h-2 w-1/2 rounded bg-gray-100" />
        </div>
      </div>

      <!-- Empty state -->
      <EmptyState
        v-else-if="billingAccounts.length === 0"
        message="You don't have any billing accounts yet."
        subMessage="Add account to start managing your utilities and bills and get timely reminders."
        icon="pi pi-credit-card"
        action-label="New Account"
        @action="goToNewBillingAccount"
      />

      <!-- Card grid -->
      <div v-else class="grid gap-2 grid-cols-1 lg:grid-cols-2">
        <div
          v-for="account in billingAccounts"
          :key="account.id"
          class="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-gray-200"
          @click="editBillingAccount(account.id)"
        >
          <!-- Status strip -->
          <span
            :class="[
              'absolute left-0 top-0 h-full w-1 rounded-l-2xl',
              account.isActive ? 'bg-emerald-400' : 'bg-red-400',
            ]"
          />

          <div class="space-y-3 pl-2">
            <!-- Account name -->
            <div>
              <p class="truncate text-base font-semibold text-gray-800">
                {{ account.accountName }}
              </p>
              <p class="mt-0.5 truncate text-xs text-gray-400">
                {{ account.vendor?.vendorname ?? "No vendor" }}
              </p>
            </div>

            <!-- Due schedule -->
            <div class="flex items-center gap-1.5 text-xs text-gray-500">
              <i class="pi pi-calendar text-gray-300" />
              <span
                >{{ account.frequency }} &mdash;
                {{ getDueSchedule(account) }}</span
              >
            </div>

            <!-- Status badge -->
            <div>
              <span
                :class="[
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  account.isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-600',
                ]"
              >
                {{ account.isActive ? "Active" : "Inactive" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
