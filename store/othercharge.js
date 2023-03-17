import { defineStore } from "pinia"

export const useOtherChargeStore = defineStore('otherChargeStore',
    {
        persist: true,
        state: () => ({
            selectedChargeID: null,
            chargable: null
        }),
        actions: {
            setSelectedCharge(chargeID, chargable) {
                this.selectedChargeID = chargeID
                this.chargable = chargable
            }
        },
        getters: {
            getselectedChargeID: (state) => state.selectedChargeID,
            getChargable: (state) => state.chargable,
        },
    },
)
