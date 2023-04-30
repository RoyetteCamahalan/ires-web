<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">

            <FormLabel for="vendorname" label="Name" />
            <FormTextField name="vendorname" placeholder="Name" v-model="state.data.vendorname"></FormTextField>
            <FormError :error="v$.data.vendorname && v$.data.vendorname.$errors && v$.data.vendorname.$errors.length > 0 ? v$.data.vendorname.$errors[0].$message : null "/>

            <FormLabel for="address" label="Address" />
            <FormTextField name="address" placeholder="Address" v-model="state.data.address"></FormTextField>
            
            <FormLabel for="contactno" label="Contact #" />
            <FormTextField name="contactno" placeholder="Contact #" v-model="state.data.contactno"></FormTextField>
            
            <FormLabel for="tinno" label="TIN #" />
            <FormTextField name="tinno" placeholder="TIN #" v-model="state.data.tinno"></FormTextField>
                                
            <div class="flex mt-1">
                <FormCheckBox v-model="state.data.isactive" class="my-auto"></FormCheckBox>
                <FormLabel for="isactive" label="Is Active" />
            </div>
        </div>
        <div class="px-4">
            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
            <div class="flex flex-row-reverse">
                <FormButton buttonStyle="primary" class="text-sm" @click="submit">Submit</FormButton>
            </div>
        </div>
        </LoadingSpinner>
    </div>
</template>
<script setup>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { expenseService } from '@/components/api/ExpenseService'

const emit = defineEmits(['modalClose'])

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
    }
})

const state = reactive({
    error: null,
    isPageLoading: false,
    data:{
        vendorid: 0,
        vendorname: '',
        expensetypecat: null,
        isactive: true,
    },
})
onMounted(() =>{
    if(props.formStatus === 0)
        state.data.vendorid = 0
    else if(props.formStatus === 1)
        loadRecord()
})

const validators = computed(() =>{
  return {
    data: {
        vendorname: { 
            required: helpers.withMessage('This field is required.', required),
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
            let response
            if(props.formStatus === 0)
                response = await expenseService.createVendor(state.data)
            else
                response = await expenseService.updateVendor(state.data)
            emit('modalClose', response.data.vendorid)
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await expenseService.getVendor(props.selectedDataID)
        state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>