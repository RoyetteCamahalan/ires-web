<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
                <NavigationBack url="/accountspayable"></NavigationBack>
                <div class="px-2 py-4 rounded-lg bg-white">
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="vendor" label="Vendor" />
                            <FormSelectVendor v-model="state.data.vendorid" :defaultOption="state.vendor"></FormSelectVendor>
                            <FormError :error="v$.data.vendorid && v$.data.vendorid.$errors && v$.data.vendorid.$errors.length > 0 ? v$.data.vendorid.$errors[0].$message : null "/>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="expensetype" label="Expense Type" />
                            <FormSelectExpensetypes v-model="state.data.expensetypeid"></FormSelectExpensetypes>
                            <FormError :error="v$.data.expensetypeid && v$.data.expensetypeid.$errors && v$.data.expensetypeid.$errors.length > 0 ? v$.data.expensetypeid.$errors[0].$message : null "/>
                        </div>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="refno" label="Ref #" />
                            <FormTextField name="refno" placeholder="Ref #" v-model="state.data.refno"/>
                            <FormError :error="v$.data.refno && v$.data.refno.$errors && v$.data.refno.$errors.length > 0 ? v$.data.refno.$errors[0].$message : null "/>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="actualdate" label="Actual Date"/>
                            <FormDateField name="actualdate" placeholder="Date" v-model="state.data.actualdate"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="amount" label="Amount"/>
                            <FormNumberField name="amount" placeholder="Amount" v-model="state.data.amount"/>
                            <FormError :error="v$.data.amount && v$.data.amount.$errors && v$.data.amount.$errors.length > 0 ? v$.data.amount.$errors[0].$message : null "/>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="remarks" label="Remarks" />
                            <FormTextField name="remarks" placeholder="Remarks" v-model="state.data.memo"/>
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
  import { expenseService } from '@/components/api/ExpenseService'
  import { useAccountsPayableStore } from '@/store/accountspayable'
  import moment from 'moment'
          
  const currentDate = new Date();
  const accountsPayableStore = useAccountsPayableStore()

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
        chargeid: 0,
        companyid: 0,
        vendorid: null,
        actualdate: moment(currentDate).format('YYYY-MM-DD'),
        expensetypeid: null,
        refno: '',
        memo: '',
        amount: 0,
      },
      vendor: null
  })
  
  const validators = computed(() =>{
    return {
      data: {
        vendorid: { required: helpers.withMessage('This field is required.', required) },
        expensetypeid: { required: helpers.withMessage('This field is required.', required) },
        refno: { required: helpers.withMessage('This field is required.', required) },
        amount: { 
          numeric: helpers.withMessage('Invalid input.', numeric),
          minValue: helpers.withMessage('This field is required.', minValue(1)) 
        },
      },
    }
  })
  
  const v$ = useVuelidate(validators, state)


  onMounted(() =>{
    if(props.formStatus === 1)
      loadRecord()
  })

  async function loadRecord(){
    state.isPageLoading = true
    try{
      const response = await expenseService.getAccountPayable(accountsPayableStore.getSelectedAP)
      response.data.actualdate = moment(response.data.actualdate).format('YYYY-MM-DD')
      state.vendor = response.data.vendor
      state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
  }

  const submit = async () => {
    v$.value.$validate()
    if(!v$.value.$error){
        state.isPageLoading = true;
        try{
          if(props.formStatus === 0)
            await expenseService.createAccountPayable(state.data)
          else
            await expenseService.updateAccountPayable(state.data)
          navigateTo('/accountspayable')
        }
        catch(error){
            state.error = error.message
        }
        state.isPageLoading = false;
    }
  }
</script>
  