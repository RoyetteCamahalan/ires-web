<script setup lang="ts">
import type { PropType } from "vue";
import { useNuxtApp } from "#imports";
import type { BillingAccountPayment } from "~/types/billing-account";
import moment from "moment";

defineOptions({
  name: "BillingAccountPaymentHistory",
});

defineProps({
  payments: {
    type: Array as PropType<BillingAccountPayment[]>,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["create", "void-payment"]);

const { $formatAmount } = useNuxtApp();
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span>Payment History</span>
        <Button label="Post Payment" @click="$emit('create')" />
      </div>
    </template>
    <template #content>
      <DataTable
        :value="payments"
        :loading="isLoading"
        data-key="id"
        size="small"
      >
        <template #empty>No payments found.</template>

        <Column field="paymentDate" header="Payment Date">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.paymentDate, "MM/DD/YYYY") }}
          </template>
        </Column>
        <Column header="Coverage">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.periodFrom, "MM/DD/YYYY") }} to
            {{ formatDate(slotProps.data.periodTo, "MM/DD/YYYY") }}
          </template>
        </Column>
        <Column field="refNo" header="Ref No." />
        <Column field="paymentMode" header="Mode" />
        <Column header="Amount">
          <template #body="slotProps">
            {{ $formatAmount(slotProps.data.amount ?? 0) }}
          </template>
        </Column>
        <Column header="Status">
          <template #body="slotProps">
            <Tag
              :severity="
                slotProps.data.status === 'Voided' ? 'danger' : 'success'
              "
              :value="slotProps.data.status"
            />
          </template>
        </Column>
        <Column header="Action">
          <template #body="slotProps">
            <Button
              v-if="slotProps.data.status !== 'Voided'"
              label="Void"
              severity="danger"
              outlined
              size="small"
              @click="$emit('void-payment', slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
