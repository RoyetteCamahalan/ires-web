import { api } from "~/components/api/BaseAPIService";
import { useExpensesStore } from "~/store/expenses";
import { useOfficeStore } from "~/store/office";
import { useUserStore } from "~/store/user";

class DataPreload {
  async Run() {
    const userStore = useUserStore();

    if (!userStore.token) return;

    const storeMap = {
      officeStore: useOfficeStore(),
      expensesStore: useExpensesStore(),
    } as any;

    const preloads = ["officeStore.offices", "expensesStore.expenseTypes"];

    try {
      const response = await api.request("company/preload", "GET");
      if (!response) return;

      preloads.forEach((preload) => {
        const [storeName, refContainer] = preload.split(".");
        const store = storeMap[storeName ?? ""];
        store[refContainer ?? ""] = response[refContainer ?? ""];
      });
    } catch (error: any) {}
  }
}

export const useDataPreload = new DataPreload();
