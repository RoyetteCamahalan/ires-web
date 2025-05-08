<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
            <div v-if="props.target == 'details'" class="mx-4 mt-2">
                <FormLabel for="name" label="Project Name" />
                <FormTextField name="name" placeholder="Name" v-model="state.data.propertyname"></FormTextField>
                <FormError :error="v$.data.propertyname && v$.data.propertyname.$errors && v$.data.propertyname.$errors.length > 0 ? v$.data.propertyname.$errors[0].$message : null "/>
                    
                <FormLabel for="alias" label="Short Name/Alias (Incase of long project name)" />
                <FormTextField name="alias" placeholder="Short Name" v-model="state.data.alias"></FormTextField>

                <FormLabel for="address" label="Address" />
                <FormTextField name="address" placeholder="Address" v-model="state.data.address"></FormTextField>

                <FormLabel for="area" label="Land Area (sqm)" />
                <FormNumberField name="area" placeholder="Area" v-model="state.data.area"></FormNumberField>
            </div>
            <div v-else class="mx-4 mt-2">
                <div>
                    <FormLabel for="paymentterm" label="Payment Term (# of months)" />
                    <FormNumberField name="paymentterm" placeholder="# of months" v-model="state.data.paymentterm"></FormNumberField>
                </div>
                <div>
                    <FormLabel for="interest" label="% Monthly Penalty (Add-on interest for unpaid dues)" />
                    <FormNumberField name="interest" placeholder="Add-on interest for unpaid dues" v-model="state.data.interest"></FormNumberField>
                </div>
                <div>
                    <FormLabel for="paymentextension" label="Payment Extension (# of days allowance before penalty)" />
                    <FormNumberField name="paymentextension" placeholder="# days allowance before penalty" v-model="state.data.paymentextension"></FormNumberField>
                </div>
                <div>
                    <FormLabel for="com_percentage" label="% Commission Percentage (base on contract price)" />
                    <FormNumberField name="com_percentage" placeholder="Base on contract price" v-model="state.data.com_percentage"></FormNumberField>
                </div>
                <div>
                    <FormLabel for="commissionterm" label="% Commission Term (Divide commission in months)" />
                    <FormNumberField name="commissionterm" placeholder="Divide commission in months" v-model="state.data.commissionterm"></FormNumberField>
                </div>
            </div>
            <div class="px-4">
                <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                <div :class="'flex ' + (props.isOnBoarding ? 'justify-between' : 'flex-row-reverse')">
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
import { useUserStore } from '@/store/user'

const emit = defineEmits(['modalClose','onSkipTour'])

const user = useUserStore().getUser

const props = defineProps({
    target:{
        type: String,
        required: false,
        default: 'details'
    },
    uuid:{
        type: String,
        required: false
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
        propertyid: 0,
        propertyname: '',
        alias: '',
        address: '',
        area: 0,
        paymentterm: 0,
        interest: 0,
        paymentextension: 0,
        com_percentage: 0,
        commissionterm: 0
    },
})
onMounted(() =>{
    loadRecord()
})

const validators = computed(() =>{
  return {
    data: {
        propertyname: { 
        required: helpers.withMessage('This field is required.', required),
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
            await projectService.UpdateProject(state.data)
            emit('modalClose', true)
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await projectService.GetProject(props.uuid)
        state.data.propertyid = response.data.propertyid
        state.data.propertyname = response.data.propertyname
        state.data.alias = response.data.alias
        state.data.area = response.data.area
        state.data.address = response.data.address
        state.data.paymentterm = response.data.paymentterm
        state.data.interest = response.data.interest
        state.data.paymentextension = response.data.paymentextension
        state.data.com_percentage = response.data.com_percentage
        state.data.commissionterm = response.data.commissionterm
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>