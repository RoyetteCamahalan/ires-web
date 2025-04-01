<template>
    <div>
        <ModalEmpty :isShow="props.isShow">
            <LoadingSpinner :isActive="state.isPageLoading">
                <UiOnboardingWelcome v-if="state.currentPage == 0" @onStart="startTour" :hasTour="props.hasTour" class="ease-in-out duration-300"></UiOnboardingWelcome>
                <div v-else class="w-full bg-white rounded-lg">
                    <div v-if="state.currentPage == 1"
                        class="pt-4 px-4 ease-in-out duration-300">
                        <h1 class="text-sm text-blue-600">First, we will add a Building. You can manage your building under `Buildings` menu</h1>
                        <UiProperty :isOnBoarding="true" @onSkipTour="completeTour" @modalClose="afterSaveBuilding"></UiProperty>
                    </div>
                    <div v-else-if="state.currentPage == 2"
                        class="pt-4 px-4 ease-in-out duration-300">
                        <h1 class="text-sm text-blue-600">Now, lets add room to your Building. You can manage your building under `Buildings` menu then click `Manage`</h1>
                        <UiPropertyUnit :isOnBoarding="true" :selectedPropertyID="state.currentBuilding.propertyid" @onSkipTour="completeTour" @modalClose="afterSaveUnit"></UiPropertyUnit>
                    </div>
                    <div v-else-if="state.currentPage == 3" class="ease-in-out duration-300">
                        <div class="w-full relative flex items-start justify-center">
                            <div class="absolute -top-14">
                                <Icon v-if="state.error && state.error.length>0" name="ri:close-circle-line" size="6rem" class="text-red-400 bg-white rounded-full" />
                                <Icon v-else name="material-symbols:check-circle" size="6rem" class="text-blue-500 bg-white rounded-full" />
                                
                            </div>
                            <span class="mt-10 mb-4 text-xl text-gray-700 text-center">
                                    {{ (state.error && state.error.length>0) || state.isPageLoading ? "" : "Awesome!" }}
                            </span>
                        </div>
                        <div>
                            <p class="text-gray-700 text-center">
                                You are now ready to create Rental Contracts!
                            </p>
                        </div>
                        <div class="w-full flex justify-center pt-6 pb-4">                        
                            <button 
                                @click="navigateTo('/rentals')"
                                class="py-1 px-6 bg-blue-500 text-white font-semibold rounded-full">Got It!</button>
                        </div>
                    </div>
                </div>
            </LoadingSpinner>
        </ModalEmpty>
    </div>
</template>

<script setup>
import { companyService} from '@/components/api/CompanyService'
import { projectService } from '@/components/api/ProjectService'
import { useUserStore } from '@/store/user'
import { plan } from '@/contants/consts';

const { $isRental } = useNuxtApp()
const userStore = useUserStore()
const user = userStore.getUser

const emit = defineEmits(['onHideTour'])
const props = defineProps({
    hasTour: {
        type: Boolean,
        required: false,
        default: false
    },
    isShow: {
        type: Boolean,
        required: false,
        default: false
    }
})

const state = reactive({ 
    currentPage: 0,
    planID: user.company.planid,
    isWelcomeLoading: false,
    isPageLoading: false,
    currentBuilding: {
        propertyid: 0
    }
})

async function startTour(){
    if(props.hasTour && $isRental(state.planID)){
        state.isWelcomeLoading = true
        try{
            const response = await projectService.GetRentalProperties(1, '')
            if(response.data && response.data.data.length === 1){
                const data = response.data.data[0]
                state.currentBuilding.propertyid = data.propertyid
                if(data.noofunits > 0)
                    await completeTour()
                else
                    state.currentPage = 2
            }   
            else if(response.data && response.data.length > 1)
                await completeTour()
            else
                state.currentPage = 1
        }
        catch(error){
            console.log(error)
        }
        state.isWelcomeLoading = false
    }else
        completeTour()
}
async function completeTour(){
    state.isPageLoading = true
    try{
        await companyService.completeTour(user.company.id)
        if(state.currentPage != 3){
            userStore.completeTour()
            emit('onHideTour')
        }
    }
    catch(error){

    }
    state.isPageLoading = false
}

function afterSaveBuilding(value){
    if(value){
        state.currentBuilding = value
        state.currentPage = 2
    }
}
async function afterSaveUnit(value){
    if(value){
        state.currentPage = 3
        await completeTour()
    }
}

</script>