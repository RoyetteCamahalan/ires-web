<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
            <FormLabel for="otherfeeid" label="Other Fee" />
            <div class="relative">
                <FormSelectOtherFees name="otherfeeid" :default-option="state.otherfee" v-model="state.data.otherfeeid" class="pr-16"></FormSelectOtherFees>
                <a 
                    href="/masterfiles/otherfees" target="_blank"
                    class="flex items-center absolute inset-y-0 right-0 px-3 text-sm text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-r-md hover:bg-blue-700">
                    Manage
                </a>
            </div>
            <FormError :error="v$.data.otherfeeid && v$.data.otherfeeid.$errors && v$.data.otherfeeid.$errors.length > 0 ? v$.data.otherfeeid.$errors[0].$message : null "/>
            <FormLabel for="chargedate" label="Charge Date" />
            <FormDateField name="chargedate" placeholder="Charge Date" v-model="state.data.chargedate" />

            <FormLabel for="amount" label="Amount"/>
            <LoadingSpinner :isActive="state.isFetchingAmount">
                <FormNumberField name="amount" placeholder="Amount" v-model="state.data.chargeamount"/>
            </LoadingSpinner>
            <FormError :error="v$.data.chargeamount && v$.data.chargeamount.$errors && v$.data.chargeamount.$errors.length > 0 ? v$.data.chargeamount.$errors[0].$message : null "/>

                     
            <div class="flex mt-1">
                <FormCheckBox v-model="state.hasInterest" class="my-auto"></FormCheckBox>
                <FormLabel for="hasInterest" label="Has Monthly Interest?" />
            </div>
            <div v-if="state.hasInterest">
                <FormLabel for="interestpercentage" label="Monthly Interest Percentage"/>
                <FormNumberField name="interestpercentage" placeholder="Interest Percentage (e.g. 3)" v-model="state.data.interestpercentage"/>
                <FormError :error="v$.data.interestpercentage && v$.data.interestpercentage.$errors && v$.data.interestpercentage.$errors.length > 0 ? v$.data.interestpercentage.$errors[0].$message : null "/>
            </div>
                
        </div>
        <div class="px-4">
            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
            <div class="flex" :class="props.formStatus === 0 && 'flex-row-reverse', props.formStatus != 0 && 'justify-between' ">
                <FormButton v-if="props.formStatus != 0" buttonStyle="danger" class="text-sm" @click="removeCharge">Remove this Charge</FormButton>
                <FormButton buttonStyle="primary" class="text-sm" @click="submit">Submit</FormButton>
            </div>
        </div>
        </LoadingSpinner>
    </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, requiredIf, helpers, numeric } from '@vuelidate/validators'
import { otherChargeService } from '@/components/api/OtherChargeService'
import { rentalService } from '@/components/api/RentalService'
import moment from 'moment'

const emit = defineEmits(['modalClose'])

const currentDate = new Date();

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
    contractid:{
        type: Number,
        required: true,
    }
})
const state = reactive({
    error: null,
    isPageLoading: false,
    isFetchingAmount: false,
    data:{
        chargeid: props.selectedDataID,
        otherfeeid: null,
        contractid: props.contractid,
        chargedate: moment(currentDate).format('YYYY-MM-DD'),
        chargeamount: null,
        interestpercentage: null,
    },
    hasInterest: false,
    otherfee: null,
    removeChargeError: '',
})
onMounted(() =>{
    if(props.formStatus === 0)
        state.data.propertyid = 0
    else if(props.formStatus === 1)
        loadRecord()
})

watch(() => state.data.otherfeeid, async (newValue) => {
    if(state.formStatus === 0 && state.data.otherfeeid && state.data.otherfeeid > 0)
        await loadDefaultAmount()
})

async function loadDefaultAmount(){
    state.isFetchingAmount = true
    try{
        const response = await otherChargeService.GetOtherFee(state.data.otherfeeid)
        if(response.data.price && response.data.price > 0)
            state.data.chargeamount = response.data.price
    }catch(error){
        state.error = error.message
    }
    state.isFetchingAmount = false
}

const validators = computed(() =>{
  return {
    data: {
        contractid: 0,
        otherfeeid: { 
            required: helpers.withMessage('This field is required.', required),
        },
        chargeamount: { 
            required: helpers.withMessage('This field is required.', required),
            numeric: helpers.withMessage('Amount is invalid.', numeric),
        },
        interestpercentage: { 
            required: helpers.withMessage('This field is required.', 
            requiredIf(function() {
                return state.hasInterest
            })),
            numeric: helpers.withMessage('Invalid input.', numeric)
        },
    }
  }
})
const v$ = useVuelidate(validators, state)

async function submit(){
    state.isPageLoading = true
    v$.value.$validate()
    if(!v$.value.$error){
        try{
            if(!state.hasInterest)
                state.data.interestpercentage = 0
            if(props.formStatus === 0)
                await rentalService.postOtherCharge(state.data)
            else
                await rentalService.updateOtherCharge(state.data)
            emit('modalClose', true)
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
async function removeCharge(){
    state.isPageLoading = true
    try{
        await rentalService.deleteOtherCharge(props.selectedDataID)
        emit('modalClose', true)
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await rentalService.getRentalCharge(props.selectedDataID)
        state.otherfee = { value: response.data.otherFee.id, label: response.data.otherFee.name }
        state.data.otherfeeid = response.data.otherfeeid
        state.data.chargedate = moment(response.data.chargedate).format('YYYY-MM-DD')
        state.data.chargeamount = response.data.chargeamount
        state.data.interestpercentage = response.data.interestpercentage
        state.hasInterest  = response.data.interestpercentage > 0
        //state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>