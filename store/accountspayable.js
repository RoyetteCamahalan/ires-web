import { defineStore } from "pinia"

export const useAccountsPayableStore = defineStore('surveyStore',
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
