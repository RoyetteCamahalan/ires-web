import { defineStore } from "pinia"

export const useExpenseStore = defineStore('expenseStore',
    {
        persist: true,
        state: () => ({
            selectedID: null,
            startDate: null,
            endDate: null,
        }),
        actions: {
            setSelectedID(id) {
                this.selectedID = id
            },
            setDateRange(sdate, edate){
                this.startDate = sdate
                this.endDate = edate
            }
        },
        getters: {
            getSelectedID: (state) => state.selectedID,
            getStartDate: (state) => state.startDate,
            getEndDate: (state) => state.endDate,
        },
    },
)
