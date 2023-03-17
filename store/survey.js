import { defineStore } from "pinia"

export const useSurveyStore = defineStore('surveyStore',
    {
        persist: true,
        state: () => ({
            selectedSurvey: null,
        }),
        actions: {
            setSelectedSurvey(survey) {
                this.selectedSurvey = survey
            }
        },
        getters: {
            getSelectedSurvey: (state) => state.selectedSurvey,
        },
    },
)
