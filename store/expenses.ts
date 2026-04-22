import { defineStore } from "pinia";
import { api } from "~/components/api/BaseAPIService";
import { ExpenseType } from "~/types/entities";

export const useExpensesStore = defineStore("expense", () => {
  const expenseTypes = ref<ExpenseType[]>([]);

  const activeExpenseTypes = computed(() => {
    return expenseTypes.value.filter((e) => e.isactive);
  });

  return {
    expenseTypes,
    activeExpenseTypes,
  };
});
