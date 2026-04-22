<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { expenseService } from "~/components/api/ExpenseService";
import { useBillingAccountStore } from "~/store/billingAccount";
import {
  BillingAccountFrequency,
  BillingAccountNotifyOption,
  type BillingAccount,
  type BillingAccountFormModel,
  type BillingAccountVendor,
} from "~/types/billing-account";
import {
  billingAccountFrequencyOptions,
  billingAccountWeekdayOptions,
  createBillingAccountFormFromRecord,
  createEmptyBillingAccountForm,
} from "~/utils/billing-account";

type SelectOption = {
  label: string;
  value: number;
};

const notifyOptionList = [
  { label: "None", value: BillingAccountNotifyOption.None },
  { label: "Only Me", value: BillingAccountNotifyOption.OnlyMe },
  { label: "All Users", value: BillingAccountNotifyOption.AllUsers },
];

defineOptions({
  name: "BillingAccountForm",
});

const props = defineProps({
  billingAccountId: {
    type: Number,
    required: false,
    default: null,
  },
});

const emit = defineEmits(["saved", "cancel"]);

const { $toastNotification } = useNuxtApp();
const billingAccountStore = useBillingAccountStore();
const isEditing = computed(() => Number(props.billingAccountId) > 0);

const form = reactive<BillingAccountFormModel>(createEmptyBillingAccountForm());

const vendorSelection = ref<SelectOption | null>(null);
const vendorSuggestions = ref<SelectOption[]>([]);

const errorMessage = ref("");
const isLoadingRecord = ref(false);
const isLoadingOptions = ref(false);
const isSavingForm = ref(false);
const isLoadingVendors = ref(false);
const hasSubmitted = ref(false);

const validationErrors = computed<Record<string, string>>(() => {
  const errors: Record<string, string> = {};

  if (!form.accountName.trim())
    errors.accountName = "Account name is required.";
  if (!form.vendorId) errors.vendorId = "Vendor is required.";
  if (!form.officeId) errors.officeId = "Office is required.";
  if (!form.expenseTypeId) errors.expenseTypeId = "Expense type is required.";
  if (form.hasFixedAmount && (!form.amount || form.amount <= 0)) {
    errors.amount = "Amount is required for fixed amount accounts.";
  }
  if (form.notifyDaysBefore < 0) {
    errors.notifyDaysBefore = "Notify days before must be zero or greater.";
  }
  if (form.frequency === BillingAccountFrequency.Monthly) {
    if (
      !form.dueDayOfMonth ||
      form.dueDayOfMonth < 1 ||
      form.dueDayOfMonth > 31
    ) {
      errors.dueDayOfMonth =
        "Monthly frequency requires a due day between 1 and 31.";
    }
  }
  if (form.frequency === BillingAccountFrequency.Weekly) {
    if (
      form.dueDayOfWeek === null ||
      form.dueDayOfWeek < 0 ||
      form.dueDayOfWeek > 6
    ) {
      errors.dueDayOfWeek = "Weekly frequency requires a day of week.";
    }
  }

  return errors;
});

const hasValidationErrors = computed(
  () => Object.keys(validationErrors.value).length > 0,
);

onMounted(async () => {
  if (isEditing.value) {
    await loadRecord();
  } else {
    onFrequencyChange(form.frequency);
  }
});

const normalizeCollection = <T,>(response: any): T[] => {
  const payload = response?.data?.data ?? response?.data ?? response;
  return Array.isArray(payload) ? payload : [];
};

const mapVendorOption = (vendor: BillingAccountVendor) => {
  return {
    label: vendor.vendorname,
    value: vendor.vendorid,
  };
};

const loadRecord = async () => {
  isLoadingRecord.value = true;
  errorMessage.value = "";

  try {
    const record = await billingAccountStore.getBillingAccount(
      Number(props.billingAccountId),
    );

    if (!record) {
      errorMessage.value = "Billing account not found.";
      return;
    }

    applyRecord(record);
  } catch (error: any) {
    errorMessage.value = error.message ?? "Failed to load billing account.";
  }

  isLoadingRecord.value = false;
};

const applyRecord = (record: BillingAccount) => {
  Object.assign(form, createBillingAccountFormFromRecord(record));

  if (record.vendor) {
    vendorSelection.value = mapVendorOption(record.vendor);
    vendorSuggestions.value = [mapVendorOption(record.vendor)];
  }

  onFrequencyChange(form.frequency);
};

const searchVendors = async (event: { query?: string }) => {
  isLoadingVendors.value = true;

  try {
    const response = await expenseService.getVendors(
      1,
      false,
      event?.query ?? "",
    );

    const vendors = normalizeCollection<BillingAccountVendor>(response);
    vendorSuggestions.value = vendors.map(mapVendorOption);

    if (
      vendorSelection.value &&
      !vendorSuggestions.value.some(
        (option) => option.value === vendorSelection.value?.value,
      )
    ) {
      vendorSuggestions.value.unshift(vendorSelection.value);
    }
  } catch {
    vendorSuggestions.value = vendorSelection.value
      ? [vendorSelection.value]
      : [];
  }

  isLoadingVendors.value = false;
};

const onFrequencyChange = (value: string) => {
  form.frequency = value as BillingAccountFormModel["frequency"];

  if (form.frequency === BillingAccountFrequency.Monthly) {
    form.dueDayOfMonth = form.dueDayOfMonth ?? 1;
    form.dueDayOfWeek = null;
    return;
  }

  form.dueDayOfWeek = form.dueDayOfWeek ?? 0;
  form.dueDayOfMonth = null;
};

const onFixedAmountChange = (value: boolean) => {
  form.hasFixedAmount = value;
  if (!value) form.amount = null;
};

const saveBillingAccount = async () => {
  hasSubmitted.value = true;
  errorMessage.value = "";

  if (hasValidationErrors.value) return;

  isSavingForm.value = true;

  try {
    const payload = {
      ...form,
      amount: form.hasFixedAmount ? form.amount : null,
      dueDayOfMonth:
        form.frequency === BillingAccountFrequency.Monthly
          ? form.dueDayOfMonth
          : null,
      dueDayOfWeek:
        form.frequency === BillingAccountFrequency.Weekly
          ? form.dueDayOfWeek
          : null,
    };

    const response = isEditing.value
      ? await billingAccountStore.updateBillingAccount(payload)
      : await billingAccountStore.createBillingAccount(payload);

    const savedId = response?.id ?? form.id;

    $toastNotification(
      "success",
      "Billing Accounts",
      isEditing.value
        ? "Billing account updated successfully."
        : "Billing account created successfully.",
    );

    emit("saved", savedId);
  } catch (error: any) {
    errorMessage.value = error.message ?? "Failed to save billing account.";
  }

  isSavingForm.value = false;
};
</script>

<template>
  <div class="mx-4 mt-4">
    <Message v-if="errorMessage" severity="error" class="mb-4">{{
      errorMessage
    }}</Message>
    <div
      v-if="isLoadingRecord || isLoadingOptions"
      class="py-8 text-center text-sm text-gray-500"
    >
      Loading billing account form...
    </div>

    <div v-else class="flex flex-col gap-2">
      <div>
        <FormLabel for="accountName" label="Account Name" />
        <InputText
          v-model.trim="form.accountName"
          fluid
          placeholder="Main Office - MERALCO"
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.accountName"
          class="text-red-500"
          >{{ validationErrors.accountName }}</small
        >
      </div>

      <div class="flex items-center justify-end gap-3">
        <Checkbox
          v-model="form.isActive"
          binary
          input-id="billing-account-is-active"
        />
        <label
          for="billing-account-is-active"
          class="text-sm font-medium text-gray-700"
          >Active</label
        >
      </div>

      <div>
        <FormLabel for="vendor" label="Vendor" />
        <FormSelectVendor
          v-model="form.vendorId"
          :showCreate="true"
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.vendorId"
          class="text-red-500"
          >{{ validationErrors.vendorId }}</small
        >
      </div>

      <div class="mt-4">
        <label class="mb-2 block text-sm font-lg text-gray-600"
          >Billing Schedule:</label
        >
        <FormLabel for="frequency" label="Frequency" />
        <Select
          :model-value="form.frequency"
          :options="billingAccountFrequencyOptions"
          option-label="label"
          option-value="value"
          fluid
          placeholder="Select frequency"
          @update:model-value="onFrequencyChange"
          size="small"
        />
      </div>
      <div>
        <FormLabel
          for="vendor"
          :label="
            form.frequency === BillingAccountFrequency.Monthly
              ? 'Due Day Of Month'
              : 'Due Day Of Week'
          "
        />
        <InputNumber
          v-if="form.frequency === BillingAccountFrequency.Monthly"
          v-model="form.dueDayOfMonth"
          fluid
          :min="1"
          :max="31"
          :use-grouping="false"
          size="small"
        />

        <Select
          v-else
          v-model="form.dueDayOfWeek"
          :options="billingAccountWeekdayOptions"
          option-label="label"
          option-value="value"
          fluid
          placeholder="Select weekday"
        />

        <small
          v-if="hasSubmitted && validationErrors.dueDayOfMonth"
          class="text-red-500"
          >{{ validationErrors.dueDayOfMonth }}</small
        >
        <small
          v-if="hasSubmitted && validationErrors.dueDayOfWeek"
          class="text-red-500"
          >{{ validationErrors.dueDayOfWeek }}</small
        >
      </div>

      <div>
        <div class="mb-2 flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Fixed Amount</label>
          <ToggleSwitch
            :model-value="form.hasFixedAmount"
            @update:model-value="onFixedAmountChange"
            size="small"
          />
        </div>
        <InputNumber
          v-model="form.amount"
          fluid
          mode="currency"
          currency="PHP"
          :min="0"
          :disabled="!form.hasFixedAmount"
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.amount"
          class="text-red-500"
          >{{ validationErrors.amount }}</small
        >
      </div>

      <div class="mt-4">
        <label class="mb-2 block text-sm font-lg text-gray-600"
          >For Expense Posting:</label
        >
        <FormLabel for="office" label="Expense Office" />
        <FormSelectOffice
          v-model="form.officeId"
          :showCreate="true"
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.officeId"
          class="text-red-500"
          >{{ validationErrors.officeId }}</small
        >
      </div>

      <div>
        <FormLabel for="expenseType" label="Expense Type" />
        <FormSelectExpensetypes
          v-model="form.expenseTypeId"
          :showCreate="true"
          size="small"
        />
        <small
          v-if="hasSubmitted && validationErrors.expenseTypeId"
          class="text-red-500"
          >{{ validationErrors.expenseTypeId }}</small
        >
      </div>

      <div class="mt-4">
        <label class="block text-sm font-lg text-gray-600">Notification:</label>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <FormLabel for="notifyDaysBefore" label="Notify Days Before" />
            <InputNumber
              v-model="form.notifyDaysBefore"
              fluid
              :min="0"
              :use-grouping="false"
              size="small"
            />
            <small
              v-if="hasSubmitted && validationErrors.notifyDaysBefore"
              class="text-red-500"
              >{{ validationErrors.notifyDaysBefore }}</small
            >
          </div>
          <div>
            <FormLabel label="Notify" />
            <SelectButton
              v-model="form.notifyOption"
              :options="notifyOptionList"
              option-label="label"
              option-value="value"
              size="small"
            />
          </div>
        </div>
      </div>

      <div class="md:col-span-2">
        <FormLabel for="memo" label="Memo" />
        <Textarea v-model="form.memo" fluid auto-resize rows="4" size="small" />
      </div>
    </div>

    <div class="mt-4 flex flex-wrap justify-end gap-2">
      <Button
        label="Cancel"
        severity="secondary"
        text
        @click="emit('cancel')"
      />
      <Button
        :label="isEditing ? 'Update Account' : 'Create Account'"
        :loading="isSavingForm"
        @click="saveBillingAccount"
      />
    </div>
  </div>
</template>
