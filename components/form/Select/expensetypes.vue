<script setup lang="ts">
import { useExpensesStore } from "~/store/expenses";

const value = defineModel<number | null>({ default: null });

const props = withDefaults(
  defineProps<{
    showCreate?: boolean;
    size?: string;
  }>(),
  {
    showCreate: false,
    size: "medium",
  },
);

const expensesStore = useExpensesStore();
const { activeExpenseTypes } = expensesStore;
</script>

<template>
  <InputGroup>
    <Select
      v-model="value"
      :options="activeExpenseTypes"
      optionLabel="expensetypedesc"
      optionValue="expensetypeid"
      placeholder="Search Expense Type"
      class="w-full"
      :size="props.size"
      fluid
    />
    <InputGroupAddon v-if="showCreate">
      <Button
        as="a"
        label="Manage"
        href="/masterfiles/expensetypes"
        target="_blank"
        rel="noopener"
        :size="props.size"
      />
    </InputGroupAddon>
  </InputGroup>
</template>
