<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
                <NavigationBack url="/pettycash"></NavigationBack>
                <div class="px-2 py-4 rounded-lg bg-white">
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-6 sm:col-span-3">
                            <div class="grid grid-cols-6 gap-4">
                                <div class="col-span-6 sm:col-span-4">
                                    <FormLabel for="office" :label="state.data.transtype === 0 ? 'Office' : 'Source Office'" />
                                    <FormSelectOffice v-model="state.data.accountid"></FormSelectOffice>
                                    <FormError :error="v$.data.accountid && v$.data.accountid.$errors && v$.data.accountid.$errors.length > 0 ? v$.data.accountid.$errors[0].$message : null "/>
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <FormLabel for="currentbalance" label="Current Balance" />
                                    <LoadingSpinner :isActive="state.isFetchingBalance">
                                        <FormNumberField name="currentbalance" placeholder="Current Balance" class="text-right cursor-not-allowed" v-model="state.currentBalance" readonly></FormNumberField>
                                    </LoadingSpinner>
                                    <FormError :error="v$.currentBalance && v$.currentBalance.$errors && v$.currentBalance.$errors.length > 0 ? v$.currentBalance.$errors[0].$message : null "/>
                                </div>
                            </div>

                            <div v-if="state.data.transtype === 1">
                                <FormLabel for="office" label="Destination Office" />
                                <FormSelectOffice v-model="state.data.refaccountid"></FormSelectOffice>
                                <FormError :error="v$.data.refaccountid && v$.data.refaccountid.$errors && v$.data.refaccountid.$errors.length > 0 ? v$.data.refaccountid.$errors[0].$message : null "/>
                            </div>

                            <FormLabel for="amount" label="Amount"/>
                            <FormNumberField name="amount" placeholder="Amount" v-model="state.data.amount"/>
                            <FormError :error="v$.data.amount && v$.data.amount.$errors && v$.data.amount.$errors.length > 0 ? v$.data.amount.$errors[0].$message : null "/>

                            
                            <FormLabel for="remarks" label="Remarks" />
                            <FormTextField name="remarks" placeholder="Remarks" v-model="state.data.remarks"/>
    
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="transtype" label="Transaction Type" />
                            <FormSelect :options="state.transtypes" :canClear="false" placeholder="Select Type" v-model="state.data.transtype"></FormSelect>
                            
                            <FormLabel for="refno" label="Ref #" />
                            <FormTextField name="refno" placeholder="Ref #" v-model="state.data.refno"/>
                            <FormError :error="v$.data.refno && v$.data.refno.$errors && v$.data.refno.$errors.length > 0 ? v$.data.refno.$errors[0].$message : null "/>
                            
                            <FormLabel for="refdate" label="Date"/>
                            <FormDateField name="refdate" placeholder="Date" v-model="state.data.refdate"/>
                        </div>
                    </div>                
                    <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                </div>               
          </div>
          <NavigationBottomsave returnURL="state.returnURL" @onSave="submit"></NavigationBottomsave>
        </LoadingSpinner>
    </div>
  </template>
  
  <script setup>
  import { reactive, computed } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, minValue, helpers, numeric, requiredIf } from '@vuelidate/validators'
  import { pettyCashService } from '@/components/api/PettyCashService'
  import { accountService } from '@/components/api/AccountService'
  import { useUserStore } from '@/store/user'
  import moment from 'moment'
  
  const user = useUserStore().getUser
        
  const currentDate = new Date();
  const props = defineProps({
    formStatus:{
      type: Number,
      required: false,
      default: 0   
    }
  })
  const state = reactive({
      error: '',
      isPageLoading: false,
      data: {
        disbursementid: 0,
        companyid: user.companyid,
        accountid: null,
        refdate: moment(currentDate).format('YYYY-MM-DD'),
        refno: '',
        amount: 0,
        remarks: '',
        transtype: 0,
        refaccountid: 0,
      },
      currentBalance: 0,
      isFetchingBalance: false,
      transtypes: [
        { value: 0, label: 'Cash In' },
        { value: 1, label: 'Fund Transfer'}
      ]
  })
 
  const isValidRefAccount = () => {
    return state.data.transtype === 0 || (state.data.transtype != 0 && state.data.accountid != state.data.refaccountid && state.data.refaccountid > 0)
  }
  const isValidAccountBalance = () => {
    return state.data.transtype === 0 || (state.data.transtype != 0 && state.currentBalance >= state.data.amount)
  }
  const validators = computed(() =>{
    return {
      data: {
        accountid: { required: helpers.withMessage('This field is required.', required) },
        transtype: { required: helpers.withMessage('This field is required.', required) },
        refno: { required: helpers.withMessage('This field is required.', required) },
        amount: { 
          numeric: helpers.withMessage('Invalid input.', numeric),
          minValue: helpers.withMessage('This field is required.', minValue(1)) 
        },
        refaccountid: { isValidRefAccount: helpers.withMessage('Invalid Office.', isValidRefAccount) },
      },
      currentBalance: { isValidRefAccount: helpers.withMessage('Insufficient Balance', isValidAccountBalance) },
    }
  })
  
  const v$ = useVuelidate(validators, state)
  
watch(() => state.data.accountid, () => {
    if(state.data.accountid > 0)
        getOfficeBalance()
})

async function getOfficeBalance(){
  state.isFetchingBalance = true
    try{
        const response = await accountService.getOffice(state.data.accountid)
        state.currentBalance = response.data.pettycashbalance
    }catch(error){
        state.error = error.message
    }
    state.isFetchingBalance = false
}

  const submit = async () => {
    v$.value.$validate()
    if(!v$.value.$error){
        state.isPageLoading = true;
        try{
          console.log(state.data)
          await pettyCashService.create(state.data)
          navigateTo('/pettycash')
        }
        catch(error){
            state.error = error.message
        }
        state.isPageLoading = false;
    }
  }
  </script>
  