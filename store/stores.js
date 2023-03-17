import { defineStore } from "pinia";

export const useStoresStore = defineStore('storesStore', () => {
    const searchString = ref('')
    // include any data you want
    return {
        searchString,
    }
})