<template>
    <div>
        <NuxtLayout name="admin">
            <DashboardSurveying v-if="state.planID >= 0 && state.planID <= 3" class="my-5"></DashboardSurveying>
            <DashboardFinance class="my-5"></DashboardFinance>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const user = userStore.getUser
const state = reactive({
    planID: user.company.planid
})

</script>