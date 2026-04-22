import { defineStore } from "pinia";
import { api } from "~/components/api/BaseAPIService";
import { Vendor } from "~/types/entities";

export const useVendorStore = defineStore("vendor", () => {
  async function getVendors(
    currentPage: number,
    viewAll: boolean,
    search: string,
  ): Promise<Vendor[]> {
    const response = await api.request(
      `/expense/getvendors?currentPage=${currentPage}&viewAll=${viewAll}&search=${search}`,
      "GET",
    );
    return response.data.data;
  }

  return {
    getVendors,
  };
});
