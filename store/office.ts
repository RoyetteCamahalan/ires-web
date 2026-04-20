import { defineStore } from "pinia";
import { api } from "~/components/api/BaseAPIService";
import { Office } from "~/types/entities";

export const useOfficeStore = defineStore('office', () => {

  const offices = ref<Office[]>([]);

  const activeOffices = computed(() => {
    return offices.value.filter(o => o.isactive);
  })
  
  async function getOffice(id: number): Promise<Office> {
      const response = await api.request(`/account/getoffice?id=${id}`, 'GET')
      return response.data;
  }

  async function getOffices(currentPage: number, viewAll: boolean, search: string): Promise<any> {
      const response =  await api.request(`/account/getoffices?currentPage=${currentPage}&viewAll=${viewAll}&search=${search}`, 'GET')
      return response.data;
  }

  async function createOffice(params: object): Promise<any> {
      const response = await api.request(`/account/createoffice`, 'POST', params)
      await getOffices(0, true, '')
      return response.data;
  }

  async function updateOffice(params: object): Promise<any> {
      const response = await api.request(`/account/updateoffice`, 'PUT', params)
      await getOffices(0, true, '')
      return response.data;
  }

  return {
    offices,
    activeOffices,
    getOffice,
    getOffices,
    createOffice,
    updateOffice,
  };
});
