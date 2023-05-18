import { defineStore } from "pinia"

export const useSubscriptionStore = defineStore('subscriptionStore',
    {
        persist: true,
        state: () => ({
            selectedPlanID: null,
        }),
        actions: {
            setSelectedPlanID(id) {
                this.selectedPlanID = id
            }
        },
        getters: {
            getSelectedPlanID: (state) => state.selectedPlanID,
        },
    },
)
