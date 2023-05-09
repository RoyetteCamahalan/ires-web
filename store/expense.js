import { defineStore } from "pinia"

export const useExpenseStore = defineStore('expenseStore',
    {
        persist: true,
        state: () => ({
            selectedID: null,
        }),
        actions: {
            setSelectedID(id) {
                this.selectedID = id
            }
        },
        getters: {
            getSelectedID: (state) => state.selectedID,
        },
    },
)
