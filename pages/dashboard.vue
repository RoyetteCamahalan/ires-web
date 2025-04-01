<template>
    <div>
        <NuxtLayout name="admin" title="Dashboard">
            <DashboardSurveying v-if="$isSurveying(state.planID)" class="my-5"></DashboardSurveying>
            <DashboardRental v-if="$isRental(state.planID)" class="my-5"></DashboardRental>
            <DashboardFinance class="my-5"></DashboardFinance>
            <UiOnboarding :hasTour="state.hasTour" :isShow="state.isShowWelcome" @onHideTour="hideTour"></UiOnboarding>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { dashboardService } from '@/components/api/Dashboard';
import { plan } from '@/contants/consts';
import { useUserStore } from '@/store/user'

const { $isRental } = useNuxtApp()
const user = useUserStore().getUser

const state = reactive({
    planID: user.company.planid,
    hasTour: false,
    isShowWelcome: false
})

onMounted(async () =>{
    if(user.company.apptour == 0){
        if($isRental(state.planID)){
            await loadRecord()
        }
        state.isShowWelcome = user.company.apptour == 0; 
    } 
})
async function loadRecord(){
    try{
        const response = await dashboardService.getRental()
        if(response.data.totalProperties == 0)
            state.hasTour = true;   
    }catch(error){

    } 
}
function hideTour(){
    state.isShowWelcome = false
}

</script>