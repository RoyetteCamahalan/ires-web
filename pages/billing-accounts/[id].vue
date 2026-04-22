<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { navigateTo, useNuxtApp, useRoute } from "#imports";
import { useBillingAccountStore } from "~/store/billingAccount";
import type {
  BillingAccount,
  BillingAccountPayment,
} from "~/types/billing-account";

defineOptions({
  name: "BillingAccountsEditPage",
});

const route = useRoute();
const confirm = useConfirm();
const { $formatAmount, $toastNotification } = useNuxtApp();
const billingAccountStore = useBillingAccountStore();

const billingAccountId = computed(() => Number(route.params.id));

const account = ref<BillingAccount | null>(null);
const payments = ref<BillingAccountPayment[]>([]);
const errorMessage = ref("");
const isLoadingAccount = ref(false);
const isLoadingPayments = ref(false);
const isEditDialogVisible = ref(false);
const isPaymentDialogVisible = ref(false);

const weekdayLabelMap = new Map([
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
]);

onMounted(async () => {
  await Promise.all([loadAccount(), loadPayments()]);
});

async function loadAccount() {
  isLoadingAccount.value = true;
  errorMessage.value = "";
  try {
    account.value = await billingAccountStore.getBillingAccount(
      billingAccountId.value,
    );
  } catch (error: any) {
    errorMessage.value = error.message ?? "Failed to load billing account.";
  }
  isLoadingAccount.value = false;
}

async function loadPayments() {
  isLoadingPayments.value = true;
  try {
    payments.value = await billingAccountStore.getBillingAccountPayments(
      billingAccountId.value,
    );
  } catch (error: any) {
    errorMessage.value = error.message ?? "Failed to load billing payments.";
  }
  isLoadingPayments.value = false;
}

function getDueSchedule(acc: BillingAccount) {
  if (acc.frequency === "Monthly") {
    return `Day ${acc.dueDayOfMonth ?? "-"}`;
  }
  return weekdayLabelMap.get(acc.dueDayOfWeek ?? -1) ?? "-";
}

async function onEditSaved() {
  isEditDialogVisible.value = false;
  await loadAccount();
}

async function onPaymentCreated() {
  isPaymentDialogVisible.value = false;
  await loadPayments();
}

function voidPayment(id: number) {
  confirm.require({
    message:
      "Are you sure you want to void this payment? This cannot be undone.",
    header: "Void Payment",
    icon: "pi pi-exclamation-triangle",
    rejectProps: { label: "Cancel", severity: "secondary", text: true },
    acceptProps: { label: "Void", severity: "danger" },
    accept: async () => {
      try {
        await billingAccountStore.voidBillingAccountPayment(id);
        $toastNotification(
          "success",
          "Billing Accounts",
          "Billing payment voided successfully.",
        );
        await loadPayments();
      } catch (error: any) {
        $toastNotification(
          "error",
          "Billing Accounts",
          error.message ?? "Failed to void billing payment.",
        );
      }
    },
  });
}
</script>

<template>
  <NuxtLayout name="admin" :title="account?.accountName ?? 'Billing Account'">
    <div class="mx-4 mt-4 space-y-4">
      <!-- Back -->
      <Button
        label="Back to Billing Accounts"
        severity="secondary"
        text
        size="small"
        @click="navigateTo('/billing-accounts')"
      />

      <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>

      <!-- Account summary card -->
      <div
        v-if="isLoadingAccount"
        class="animate-pulse rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
      >
        <div class="mb-3 h-4 w-1/3 rounded bg-gray-200" />
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="n in 4" :key="n" class="h-3 rounded bg-gray-100" />
        </div>
      </div>

      <div
        v-else-if="account"
        class="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
      >
        <!-- Status strip -->
        <span
          :class="[
            'absolute left-0 top-0 h-full w-1.5 rounded-l-2xl',
            account.isActive ? 'bg-emerald-400' : 'bg-red-400',
          ]"
        />

        <div class="pl-3">
          <!-- Header row -->
          <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 class="text-xl font-bold text-gray-800">
                {{ account.accountName }}
              </h2>
              <span
                :class="[
                  'mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  account.isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-600',
                ]"
              >
                {{ account.isActive ? "Active" : "Inactive" }}
              </span>
            </div>
            <Button
              label="Edit"
              icon="pi pi-pencil"
              size="small"
              severity="secondary"
              outlined
              @click="isEditDialogVisible = true"
            />
          </div>

          <!-- Info grid -->
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">
                Vendor
              </p>
              <p class="mt-0.5 text-sm font-medium text-gray-700">
                {{ account.vendor?.vendorname ?? "—" }}
              </p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">Due</p>
              <p class="mt-0.5 text-sm font-medium text-gray-700">
                {{ account.frequency }} · {{ getDueSchedule(account) }}
              </p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">
                Next Due
              </p>
              <p class="mt-0.5 text-sm font-medium text-gray-700">
                {{ formatDate(account.nextDueDate || "", "MM/DD/YYYY") }}
              </p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">
                Amount
              </p>
              <p class="mt-0.5 text-sm font-medium text-gray-700">
                {{
                  account.hasFixedAmount
                    ? $formatAmount(account.amount ?? 0)
                    : "~"
                }}
              </p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-wide text-gray-400">
                Expense Type
              </p>
              <p class="mt-0.5 text-sm font-medium text-gray-700">
                {{ account.expenseType?.expensetypedesc ?? "—" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment history -->
      <UiBillingAccountPaymentHistory
        :payments="payments"
        :is-loading="isLoadingPayments"
        @create="isPaymentDialogVisible = true"
        @void-payment="voidPayment"
      />

      <!-- Edit dialog -->
      <Dialog
        v-model:visible="isEditDialogVisible"
        modal
        header="Edit Billing Account"
        :style="{ width: '32rem', maxWidth: '96vw' }"
      >
        <UiBillingAccountForm
          :billing-account-id="billingAccountId"
          @saved="onEditSaved"
          @cancel="isEditDialogVisible = false"
        />
      </Dialog>

      <!-- Pay bill dialog -->
      <Dialog
        v-model:visible="isPaymentDialogVisible"
        modal
        header="Post Bill Payment"
        :style="{ width: '32rem', maxWidth: '96vw' }"
      >
        <UiBillingAccountPaymentForm
          v-if="account"
          :account="account"
          @created="onPaymentCreated"
          @cancel="isPaymentDialogVisible = false"
        />
      </Dialog>
    </div>

    <ConfirmDialog />
  </NuxtLayout>
</template>
