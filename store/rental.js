import { defineStore } from "pinia"

export const useRentalStore = defineStore('rentalStore',
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
