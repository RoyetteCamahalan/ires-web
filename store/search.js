import { defineStore } from "pinia"

export const useSearchStore = defineStore('searchStore',
    {
        persist: true,
        state: () => ({
            searchData: null,
        }),
        actions: {
            setSelectedData(data) {
                this.searchData = data
            }
        },
        getters: {
            getSelectedData: (state) => state.searchData,
        },
    },
)
