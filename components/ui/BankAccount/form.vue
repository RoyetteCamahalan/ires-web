<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
            <FormLabel for="checkbank" label="Bank" />
            <FormSelectBanks v-model="state.bankAccount.bankid"></FormSelectBanks>
            <FormError :error="v$.bankAccount.bankid && v$.bankAccount.bankid.$errors && v$.bankAccount.bankid.$errors.length > 0 ? v$.bankAccount.bankid.$errors[0].$message : null "/>

            <FormLabel for="accountname" label="Account Name" />
            <FormTextField name="accountname" placeholder="Account Name" v-model="state.bankAccount.accountname"></FormTextField>
            <FormError :error="v$.bankAccount.accountname && v$.bankAccount.accountname.$errors && v$.bankAccount.accountname.$errors.length > 0 ? v$.bankAccount.accountname.$errors[0].$message : null "/>
                
            <FormLabel for="accountno" label="Account #" />
            <FormTextField name="accountno" placeholder="Account #" v-model="state.bankAccount.accountno"></FormTextField>
            <FormError :error="v$.bankAccount.accountno && v$.bankAccount.accountno.$errors && v$.bankAccount.accountno.$errors.length > 0 ? v$.bankAccount.accountno.$errors[0].$message : null "/>
                
            <FormLabel for="branch" label="Branch" />
            <FormTextField name="branch" placeholder="Branch" v-model="state.bankAccount.bankpreferredbranch"></FormTextField>
            <FormError :error="v$.bankAccount.bankpreferredbranch && v$.bankAccount.bankpreferredbranch.$errors && v$.bankAccount.bankpreferredbranch.$errors.length > 0 ? v$.bankAccount.bankpreferredbranch.$errors[0].$message : null "/>
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
import { paymentService } from '@/components/api/PaymentService'
import { accountService } from '@/components/api/AccountService'
import { useUserStore } from '@/store/user'

const emit = defineEmits(['modalClose'])

const user = useUserStore().getUser

const state = reactive({
    error: null,
    isPageLoading: false,
    bankAccount:{
        accountid: 0,
        companyid: user.companyid,
        accountname: '',
        accountno: '',
        bankid: 0,
        bankpreferredbranch: '',
        isactive: true,
        createdbyid: user.employeeid
    },
})
onMounted(() =>{

})

const validators = computed(() =>{
  return {
    bankAccount: {
        accountname: { 
        required: helpers.withMessage('This field is required.', required),
      },
        accountno: { 
        required: helpers.withMessage('This field is required.', required),
      },
      bankid:{
        required: helpers.withMessage('This field is required.', required),
        minValue: helpers.withMessage('This field is required.', minValue(1)) 
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
            const response = await accountService.createBankAccount(state.bankAccount)
            emit('modalClose', response.data.accountid)
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
</script>