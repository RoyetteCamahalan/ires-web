<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
            <FormLabel for="name" label="Bank Name" />
            <FormTextField name="name" placeholder="Bank Name" v-model="state.bank.name"></FormTextField>
            <FormError :error="v$.bank.name && v$.bank.name.$errors && v$.bank.name.$errors.length > 0 ? v$.bank.name.$errors[0].$message : null "/>
                
            <div class="flex mt-2">
                <FormSwitch :value="state.bank.isewallet" class="my-auto"
                    @toggleSwitch="state.bank.isewallet = !state.bank.isewallet" />
                <FormLabel for="isactive" label="Is E-Wallet?" class="ml-2" />
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
import { required, helpers, minValue } from '@vuelidate/validators'
import { bankService } from '@/components/api/BankService'
import { useUserStore } from '@/store/user'

const emit = defineEmits(['modalClose'])

const user = useUserStore().getUser

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
    bank:{
        bankid: props.selectedDataID,
        companyid: user.companyid,
        name: '',
        isewallet: false
    },
})
onMounted(() =>{
    if(props.formStatus === 0)
        state.bank.bankid = 0
    else if(props.formStatus === 1)
        loadRecord()
})

const validators = computed(() =>{
  return {
    bank: {
        name: { 
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
            let response
            if(props.formStatus === 0)
                response = await bankService.create(state.bank)
            else
                response = await bankService.update(state.bank)
            emit('modalClose', response.data.bankid)
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await bankService.get(props.selectedDataID)
        state.bank = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>