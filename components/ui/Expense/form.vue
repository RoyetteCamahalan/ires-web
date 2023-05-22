<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
                <NavigationBack url="/accountspayable"></NavigationBack>
                <div class="px-2 py-4 rounded-lg bg-white">
                    <div class="flex mt-1">
                        <FormCheckBox v-model="state.data.usepettycash" class="my-auto"></FormCheckBox>
                        <FormLabel for="frompettycash" label="From Petty Cash?"/>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="vendor" label="Vendor" />
                            <div class="relative">
                                <FormSelectVendor v-model="state.data.payeeid" :defaultOption="state.vendor" class="pr-16"></FormSelectVendor>
                                <button 
                                    @click="state.modalVendorShow = true"
                                    class="absolute inset-y-0 right-0 px-3 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-r-md hover:bg-blue-700">
                                    Create
                                </button>
                            </div>
                            <FormError :error="v$.data.payeeid && v$.data.payeeid.$errors && v$.data.payeeid.$errors.length > 0 ? v$.data.payeeid.$errors[0].$message : null "/>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <div class="grid grid-cols-6 gap-4">
                                <div class="col-span-6 sm:col-span-4">
                                    <FormLabel for="office" label="Office" />
                                    <FormSelectOffice v-model="state.data.accountid"></FormSelectOffice>
                                    <FormError :error="v$.data.accountid && v$.data.accountid.$errors && v$.data.accountid.$errors.length > 0 ? v$.data.accountid.$errors[0].$message : null "/>
                                </div>
                                <div class="col-span-6 sm:col-span-2">
                                    <FormLabel for="currentbalance" label="Current Balance" />
                                    <LoadingSpinner :isActive="state.isFetchingBalance">
                                        <FormNumberField name="currentbalance" placeholder="Current Balance" class="text-right cursor-not-allowed bg-blue-50" v-model="state.currentBalance" readonly></FormNumberField>
                                    </LoadingSpinner>
                                    <FormError :error="v$.currentBalance && v$.currentBalance.$errors && v$.currentBalance.$errors.length > 0 ? v$.currentBalance.$errors[0].$message : null "/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="expensetype" label="Expense Type" />
                            <FormSelectExpensetypes v-model="state.data.expensetypeid"></FormSelectExpensetypes>
                            <FormError :error="v$.data.expensetypeid && v$.data.expensetypeid.$errors && v$.data.expensetypeid.$errors.length > 0 ? v$.data.expensetypeid.$errors[0].$message : null "/>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="refno" label="Ref #" />
                            <FormTextField name="refno" placeholder="Ref #" v-model="state.data.refno"/>
                            <FormError :error="v$.data.refno && v$.data.refno.$errors && v$.data.refno.$errors.length > 0 ? v$.data.refno.$errors[0].$message : null "/>
                        </div>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="actualdate" label="Actual Date"/>
                            <FormDateField name="actualdate" placeholder="Date" v-model="state.data.refdate"/>
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="amount" label="Amount"/>
                            <FormNumberField name="amount" placeholder="Amount" v-model="state.data.amount"/>
                            <FormError :error="v$.data.amount && v$.data.amount.$errors && v$.data.amount.$errors.length > 0 ? v$.data.amount.$errors[0].$message : null "/>
                        </div>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        <div class="col-span-6 sm:col-span-3">
                            <FormLabel for="remarks" label="Remarks" />
                            <FormTextField name="remarks" placeholder="Remarks" v-model="state.data.memo"/>
                        </div>
                    </div>                
                    <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                </div>               
          </div>
          <NavigationBottomsave returnURL="state.returnURL" @onSave="submit"></NavigationBottomsave>
          <Modal title="Add New Record" :isShow="state.modalVendorShow" @modalClose="onCloseVendor">
                <UiVendor @modalClose="onCloseVendor" :formStatus="0" :selectedDataID="0"></UiVendor>
            </Modal>
        </LoadingSpinner>
    </div>
  </template>
  
  <script setup>
  import { reactive, computed } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, minValue, helpers, numeric, requiredIf } from '@vuelidate/validators'
  import { expenseService } from '@/components/api/ExpenseService'
  import { accountService } from '@/components/api/AccountService'
  import { useExpenseStore } from '@/store/expense'
  import moment from 'moment'
          
  const currentDate = new Date();
  const expenseStore = useExpenseStore()

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
        expenseid: 0,
        accountid: null,
        expensetypeid: null,
        refno: '',
        refdate: moment(currentDate).format('YYYY-MM-DD'),
        amount: 0,
        memo: '',
        payeeid: null,
        usepettycash: true
      },
      vendor: null,
      newVendorID: null,
      currentBalance: 0,
      isFetchingBalance: false,
      modalVendorShow: false,
  })
  
  const isValidAccountBalance = () => {
    return props.formStatus === 1 || !state.data.usepettycash || (props.formStatus === 0 && state.data.usepettycash && state.currentBalance >= state.data.amount)
  }
  const validators = computed(() =>{
    return {
      data: {
        payeeid: { required: helpers.withMessage('This field is required.', required) },
        expensetypeid: { required: helpers.withMessage('This field is required.', required) },
        accountid: { required: helpers.withMessage('This field is required.', required) },
        refno: { required: helpers.withMessage('This field is required.', required) },
        amount: { 
          numeric: helpers.withMessage('Invalid input.', numeric),
          minValue: helpers.withMessage('This field is required.', minValue(1)) 
        },
      },
      currentBalance: { isValidRefAccount: helpers.withMessage('Insufficient Balance', isValidAccountBalance) },
    }
  })
  
  const v$ = useVuelidate(validators, state)


  onMounted(() =>{
    if(props.formStatus === 1)
      loadRecord()
  })

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

  async function loadRecord(){
    state.isPageLoading = true
    try{
      const response = await expenseService.get(expenseStore.getSelectedID)
      response.data.refdate = moment(response.data.refdate).format('YYYY-MM-DD')
      state.vendor = response.data.vendor
      state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
  }

  function onCloseVendor(id = 0, name = ''){
    if(id > 0){
      state.data.payeeid = id;
      state.vendor = {
        vendorid: id,
        vendorname: name
      }
    }
    state.modalVendorShow = false;
  }

  const submit = async () => {
    v$.value.$validate()
    if(!v$.value.$error){
        state.isPageLoading = true;
        try{
          if(props.formStatus === 0)
            await expenseService.create(state.data)
          else
            await expenseService.update(state.data)
          navigateTo('/expenses')
        }
        catch(error){
            state.error = error.message
        }
        state.isPageLoading = false;
    }
  }
</script>
  