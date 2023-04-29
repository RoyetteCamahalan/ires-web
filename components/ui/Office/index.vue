<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">

            <FormLabel for="accountname" label="Name" />
            <FormTextField name="accountname" placeholder="Name" v-model="state.data.accountname"></FormTextField>
            <FormError :error="v$.data.accountname && v$.data.accountname.$errors && v$.data.accountname.$errors.length > 0 ? v$.data.accountname.$errors[0].$message : null "/>
            
            <FormLabel for="memo" label="Memo" />
            <FormTextField name="memo" placeholder="Memo" v-model="state.data.memo"></FormTextField>
                                
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
import { accountService } from '@/components/api/AccountService'

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
        accountid: 0,
        accountname: '',
        memo: '',
        isactive: true,
    }
})
onMounted(() =>{
    if(props.formStatus === 0)
        state.data.expensetypeid = 0
    else if(props.formStatus === 1)
        loadRecord()
})

const validators = computed(() =>{
  return {
    data: {
        accountname: { 
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
                response = await accountService.createOffice(state.data)
            else
                response = await accountService.updateOffice(state.data)
            emit('modalClose', response.data.accountid)
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await accountService.getOffice(props.selectedDataID)
        state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>