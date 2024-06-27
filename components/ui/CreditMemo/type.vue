<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">

            <FormLabel for="name" label="Name" />
            <FormTextField name="name" placeholder="Name" v-model="state.data.name"></FormTextField>
            <FormError :error="v$.data.name && v$.data.name.$errors && v$.data.name.$errors.length > 0 ? v$.data.name.$errors[0].$message : null "/>
                
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
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { creditNoteService } from '@/components/api/CreditNoteService'

const emit = defineEmits(['modalClose'])

const props = defineProps({
    isFormEdit:{
        type: Boolean,
        required: false,
        default: false
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
        id: 0,
        name: '',
        isactive: true,
    }
})
onMounted(() =>{
    if(props.isFormEdit)
        loadRecord()
    else
        state.data.expensetypeid = 0
})

const validators = computed(() =>{
  return {
    data: {
        name: { 
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
            if(props.isFormEdit)
                response = await creditNoteService.updateCreditType(state.data)
            else
                response = await creditNoteService.createCreditType(state.data)
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
        const response = await creditNoteService.getCreditType(props.selectedDataID)
        state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>