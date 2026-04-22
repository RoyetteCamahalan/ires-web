<script setup lang="ts">
import { computed, reactive, ref, type PropType } from "vue";
import { useNuxtApp } from "#imports";
import { useBillingAccountStore } from "~/store/billingAccount";
import type {
  BillingAccount,
  BillingAccountPaymentFormModel,
} from "~/types/billing-account";
import {
  billingAccountPaymentModeOptions,
  computeDefaultPaymentPeriod,
  computeNextDueDate,
  createEmptyBillingAccountPaymentForm,
  formatDateForInput,
} from "~/utils/billing-account";

const props = defineProps({
  account: {
    type: Object as PropType<BillingAccount>,
    required: true,
  },
});

defineOptions({
  name: "BillingAccountPaymentForm",
});

const emit = defineEmits(["created", "cancel"]);

const { $toastNotification } = useNuxtApp();
const billingAccountStore = useBillingAccountStore();

const form = reactive<BillingAccountPaymentFormModel>(
  createEmptyBillingAccountPaymentForm(props.account.id),
);

const paymentDateValue = ref<Date | null>(new Date());

const { periodFrom: defaultFrom, periodTo: defaultTo } =
  computeDefaultPaymentPeriod(props.account);
const periodFromValue = ref<Date | null>(
  defaultFrom ? new Date(defaultFrom) : new Date(),
);
const periodToValue = ref<Date | null>(
  defaultTo ? new Date(defaultTo) : new Date(),
);

const errorMessage = ref("");
const hasSubmitted = ref(false);
const isSavingPayment = ref(false);

const nextDueDate = computed(() => {
  const periodTo = formatDateForInput(periodToValue.value);
  if (!periodTo) return null;
  return computeNextDueDate(props.account, periodTo);
});

const validationErrors = computed<Record<string, string>>(() => {
  const errors: Record<string, string> = {};

  if (!form.amount || form.amount <= 0) errors.amount = "Amount is required.";

  const paymentDate = formatDateForInput(paymentDateValue.value);
  const periodFrom = formatDateForInput(periodFromValue.value);
  const periodTo = formatDateForInput(periodToValue.value);

  if (!paymentDate) errors.paymentDate = "Payment date is required.";
  if (!periodFrom) errors.periodFrom = "Coverage start date is required.";
  if (!periodTo) errors.periodTo = "Coverage end date is required.";
  if (periodFrom && periodTo && periodFrom > periodTo) {
    errors.periodTo = "Coverage end date must be after the start date.";
  }
  if (!form.refNo.trim()) errors.refNo = "Reference number is required.";
  if (!form.paymentMode) errors.paymentMode = "Payment mode is required.";

  return errors;
});

async function createPayment() {
  hasSubmitted.value = true;
  errorMessage.value = "";

  if (Object.keys(validationErrors.value).length > 0) return;

  isSavingPayment.value = true;

  try {
    await billingAccountStore.createBillingAccountPayment({
      ...form,
      paymentDate: formatDateForInput(paymentDateValue.value),
      periodFrom: formatDateForInput(periodFromValue.value),
      periodTo: formatDateForInput(periodToValue.value),
      nextDueDate: nextDueDate.value,
    });

    $toastNotification(
      "success",
      "Billing Accounts",
      "Payment posted successfully.",
    );
    emit("created");
  } catch (error: any) {
    errorMessage.value = error.message ?? "Failed to post payment.";
  }

  isSavingPayment.value = false;
}
</script>

<template>
  <div class="mx-4 mt-4">
    <Message v-if="errorMessage" severity="error" size="small">{{
      errorMessage
    }}</Message>

    <div class="flex flex-col gap-3">
      <div>
        <FormLabel label="Amount" />
        <InputNumber
          v-model="form.amount"
          fluid
          mode="currency"
          currency="PHP"
          :min="0"
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.amount"
          class="text-red-500"
          >{{ validationErrors.amount }}</small
        >
      </div>

      <div>
        <FormLabel label="Payment Date" />
        <DatePicker
          v-model="paymentDateValue"
          fluid
          date-format="yy-mm-dd"
          show-icon
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.paymentDate"
          class="text-red-500"
          >{{ validationErrors.paymentDate }}</small
        >
      </div>

      <div>
        <FormLabel label="Coverage From" />
        <DatePicker
          v-model="periodFromValue"
          fluid
          date-format="yy-mm-dd"
          show-icon
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.periodFrom"
          class="text-red-500"
          >{{ validationErrors.periodFrom }}</small
        >
      </div>

      <div>
        <FormLabel label="Coverage To" />
        <DatePicker
          v-model="periodToValue"
          fluid
          date-format="yy-mm-dd"
          show-icon
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.periodTo"
          class="text-red-500"
          >{{ validationErrors.periodTo }}</small
        >
        <p v-if="nextDueDate" class="mt-1 text-xs text-gray-400">
          Next bill expected:
          <span class="font-medium text-gray-600">{{ nextDueDate }}</span>
        </p>
      </div>

      <div>
        <FormLabel label="Reference No." />
        <InputText
          v-model.trim="form.refNo"
          fluid
          placeholder="OR-20260421"
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.refNo"
          class="text-red-500"
          >{{ validationErrors.refNo }}</small
        >
      </div>

      <div>
        <FormLabel label="Payment Mode" />
        <Select
          v-model="form.paymentMode"
          :options="billingAccountPaymentModeOptions"
          option-label="label"
          option-value="value"
          fluid
          placeholder="Select payment mode"
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.paymentMode"
          class="text-red-500"
          >{{ validationErrors.paymentMode }}</small
        >
      </div>

      <div class="flex items-center gap-2">
        <Checkbox
          v-model="form.usePettyCash"
          binary
          input-id="use-petty-cash"
          size="small"
        />
        <label for="use-petty-cash" class="text-sm font-medium text-gray-700"
          >Use Petty Cash</label
        >
      </div>

      <div>
        <FormLabel label="Remarks" />
        <Textarea
          v-model="form.remarks"
          fluid
          auto-resize
          rows="3"
          size="small"
        />
      </div>
    </div>

    <div class="mt-4 flex justify-end gap-2">
      <Button
        label="Cancel"
        severity="secondary"
        text
        size="small"
        @click="emit('cancel')"
      />
      <Button
        label="Post Payment"
        :loading="isSavingPayment"
        size="small"
        @click="createPayment"
      />
    </div>
  </div>
</template>
