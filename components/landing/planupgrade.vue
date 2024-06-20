<template>
    <section class="mt-4 bg-white dark:bg-gray-900">
        <div id="pricing" class="py-2 px-4 mx-auto max-w-screen-xl lg:px-6">
        <div data-aos="zoom-in" class="mx-auto max-w-screen-md text-center mb-4 lg:mb-4 aos-init aos-animate">
            <h2 class="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">Select Plan</h2>
            <div class="absolute top-0 right-0 mt-2">
                <button
                    @click="$emit('upgradePlan', 0)">
                <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
        <div class="space-y-4 lg:grid lg:grid-cols-2 sm:gap-2 xl:gap-6 lg:space-y-0">
            <LandingPricingRentalPro v-if="props.selectedModuleID === appModules.rentals">
                <button class="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-xl" :class="props.selectedPlanID >= plan.rental_pro && 'opacity-50 cursor-not-allowed'"
                    @click="$emit('upgradePlan', plan.rental_pro)">Select Plan</button>
            </LandingPricingRentalPro>
            <LandingPricingRentalEnterprise v-if="props.selectedModuleID === appModules.rentals">
                <button class="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-xl" :class="props.selectedPlanID >= plan.rental_enterprise && 'opacity-50 cursor-not-allowed'"
                    @click="$emit('upgradePlan', plan.rental_enterprise)">Select Plan</button>
            </LandingPricingRentalEnterprise>
            <LandingPricingSurveyPro v-if="props.selectedModuleID === appModules.survey">
                <button class="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-xl" :class="props.selectedPlanID >= plan.survey_pro && 'opacity-50 cursor-not-allowed'"
                    @click="$emit('upgradePlan', plan.survey_pro)">Select Plan</button>
            </LandingPricingSurveyPro>
            <LandingPricingSurveyEnterprise v-if="props.selectedModuleID === appModules.survey">
                <button class="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-xl" :class="props.selectedPlanID >= plan.survey_enterprise && 'opacity-50 cursor-not-allowed'"
                    @click="$emit('upgradePlan', plan.survey_enterprise)">Select Plan</button>
            </LandingPricingSurveyEnterprise>
        </div>
    </div>
    </section>
</template>
<script setup>
import { appModules, plan } from '@/contants/consts';

const props = defineProps({
    selectedPlanID:{
        type: Number,
        required: true
    },
    selectedModuleID:{
        type: Number,
        required: true
    }
})

const emit = defineEmits(['upgradePlan'])

</script>