<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
            <FormLabel class="pt-0" for="name" label="Name" />
            <FormTextField name="name" placeholder="Room #/ Door #" v-model="state.data.propertyname"></FormTextField>
            <FormError :error="v$.data.propertyname && v$.data.propertyname.$errors && v$.data.propertyname.$errors.length > 0 ? v$.data.propertyname.$errors[0].$message : null "/>

            <FormLabel for="area" label="Area" />
            <FormTextField name="area" placeholder="Area" v-model="state.data.area"></FormTextField>

            <FormLabel for="monthlyrent" label="Monthly Rent" />
            <FormNumberField name="monthlyrent" placeholder="Monthly Rent" v-model="state.data.monthlyrent"></FormNumberField>
            <FormError :error="v$.data.monthlyrent && v$.data.monthlyrent.$errors && v$.data.monthlyrent.$errors.length > 0 ? v$.data.monthlyrent.$errors[0].$message : null "/>
                
            <div v-if="state.showIsActive" class="flex mt-1">
                <FormCheckBox v-model="state.data.isactive" class="my-auto"></FormCheckBox>
                <FormLabel for="isactive" label="Is Active" />
            </div>
        </div>
        <div class="px-4">
            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
            <div :class=" 'flex ' + ((state.isMaxQuota || props.isOnBoarding) ? 'justify-between' : 'flex-row-reverse') ">
                <FormButton v-if="state.isMaxQuota" buttonStyle="default" class="text-sm" @click="navigateTo('/billing?upgrade=1')">Upgrade Plan</FormButton>
                <FormButton v-if="props.isOnBoarding" buttonStyle="default" class="text-sm" @click="$emit('onSkipTour')">Skip Tutorial</FormButton>
                <FormButton buttonStyle="primary" class="text-sm" @click="submit">Submit</FormButton>
            </div>
        </div>
        </LoadingSpinner>
    </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, minValue } from '@vuelidate/validators'
import { projectService } from '@/components/api/ProjectService'
import { rentalPropertyStatus } from '@/contants/consts'

const emit = defineEmits(['modalClose','onSkipTour'])

const props = defineProps({
    formStatus:{
        type: Number,
        required: false,
        default: 0
    },
    selectedDataID:{
        type: Number,
        required: false,
        default: 0
    },
    selectedPropertyID:{
        type: Number,
        required: true,
    },
    isOnBoarding:{
        type: Boolean,
        required: false,
        default: false
    }
})
const state = reactive({
    error: null,
    isPageLoading: false,
    data:{
        propertyid: props.selectedDataID,
        projectid: props.selectedPropertyID,
        propertyname: '',
        area: '',
        monthlyrent: 0,
        isactive: true
    },
    showIsActive: true,
    isMaxQuota: false
})
onMounted(() =>{
    if(props.formStatus === 0)
        state.data.propertyid = 0
    else if(props.formStatus === 1)
        loadRecord()
})

const validators = computed(() =>{
  return {
    data: {
        propertyname: { 
        required: helpers.withMessage('This field is required.', required),
      },
      monthlyrent: { 
        Number: helpers.withMessage('Must be a valid amount.', required),
      }
    }
  }
})
const v$ = useVuelidate(validators, state)

async function submit(){
    state.isPageLoading = true
    v$.value.$validate()
    if(!v$.value.$error){
        try{
            if(props.formStatus === 0)
                await projectService.CreateRentalUnit(state.data)
            else
                await projectService.UpdateRentalUnit(state.data)
            emit('modalClose', true)
            state.error = ''
        }catch(error){
            state.error = error.message
            state.isMaxQuota = error.code == 100
        }
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await projectService.GetRentalUnit(props.selectedDataID)
        state.data.propertyname = response.data.propertyname
        state.data.area = response.data.area
        state.data.monthlyrent = response.data.monthlyrent
        state.showIsActive = response.data.status !== rentalPropertyStatus.occupied
        if(state.showIsActive)
            state.data.isactive = response.data.status === rentalPropertyStatus.vacant
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>