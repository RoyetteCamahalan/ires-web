<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">

            <FormLabel for="name" label="Name" />
            <FormTextField name="name" placeholder="Name" v-model="state.data.name"></FormTextField>
            <FormError :error="v$.data.name && v$.data.name.$errors && v$.data.name.$errors.length > 0 ? v$.data.name.$errors[0].$message : null "/>
            
            <FormLabel for="price" label="Price" />
            <FormNumberField name="price" placeholder="Price" v-model="state.data.price"></FormNumberField>
            <FormError :error="v$.data.price && v$.data.price.$errors && v$.data.price.$errors.length > 0 ? v$.data.price.$errors[0].$message : null "/>

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
import { required, numeric, helpers } from '@vuelidate/validators'
import { otherChargeService } from '~/components/api/OtherChargeService'

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
        id: 0,
        name: '',
        memo: '',
        price: null,
        isactive: true,
    }
})
onMounted(() =>{
    if(props.formStatus === 0)
        state.data.id = 0
    else if(props.formStatus === 1)
        loadRecord()
})

const validators = computed(() =>{
  return {
    data: {
        name: { 
        required: helpers.withMessage('This field is required.', required),
      },
        price: { 
        numeric: helpers.withMessage('Invalid amount.', numeric),
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
            if(props.formStatus === 0){
                response = await otherChargeService.CreateOtherFee(state.data)
                emit('modalClose', response.data.id)
            }
            else{
                response = await otherChargeService.UpdateOtherFee(state.data)
                emit('modalClose', true)
            }
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await otherChargeService.GetOtherFee(props.selectedDataID)
        state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>