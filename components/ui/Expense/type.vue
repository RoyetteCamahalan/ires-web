<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">

            <FormLabel for="expensetypedesc" label="Name" />
            <FormTextField name="expensetypedesc" placeholder="Name" v-model="state.data.expensetypedesc"></FormTextField>
            <FormError :error="v$.data.expensetypedesc && v$.data.expensetypedesc.$errors && v$.data.expensetypedesc.$errors.length > 0 ? v$.data.expensetypedesc.$errors[0].$message : null "/>
            
            <FormLabel for="category" label="Category" />
            <FormSelect v-model="state.data.expensetypecat" :searchable="false" :canClear="false" :options="state.categories" placeholder="Select Category"></FormSelect>
            <FormError :error="v$.data.expensetypecat && v$.data.expensetypecat.$errors && v$.data.expensetypecat.$errors.length > 0 ? v$.data.expensetypecat.$errors[0].$message : null "/>
                                
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
        expensetypeid: 0,
        expensetypedesc: '',
        expensetypecat: null,
        isactive: true,
    },
    categories:[
        { label: "Operating Expense", value: 1},
        { label: "Non-Operating Expense", value: 2}
    ]
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
        expensetypedesc: { 
        required: helpers.withMessage('This field is required.', required),
      },
      expensetypecat:{
        required: helpers.withMessage('This field is required.', required)
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
                response = await expenseService.createExpenseType(state.data)
            else
                response = await expenseService.updateExpenseType(state.data)
            emit('modalClose', response.data.expensetypeid)
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await expenseService.getExpenseType(props.selectedDataID)
        state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>