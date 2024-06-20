<template>
    <div>
        <NuxtLayout name="admin">
            <DashboardSurveying v-if="state.planID >= plan.survey_trial && state.planID <=  plan.survey_enterprise" class="my-5"></DashboardSurveying>
            <DashboardRental v-if="state.planID >= plan.rental_trial && state.planID <=  plan.rental_enterprise" class="my-5"></DashboardRental>
            <DashboardFinance class="my-5"></DashboardFinance>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { plan } from '@/contants/consts';
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const user = userStore.getUser

console.log(user)
const state = reactive({
    planID: user.company.planid
})

</script>