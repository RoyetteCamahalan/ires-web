import { defineStore } from "pinia"

export const useAccountsPayableStore = defineStore('accountsPayableStore',
    {
        persist: true,
        state: () => ({
            selectedAP: null,
        }),
        actions: {
            setSelectedAP(survey) {
                this.selectedAP = survey
            }
        },
        getters: {
            getSelectedAP: (state) => state.selectedAP,
        },
    },
)
