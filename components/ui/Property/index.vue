<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
            <FormLabel for="name" label="Building Name" />
            <FormTextField name="name" placeholder="Name" v-model="state.data.propertyname"></FormTextField>
            <FormError :error="v$.data.propertyname && v$.data.propertyname.$errors && v$.data.propertyname.$errors.length > 0 ? v$.data.propertyname.$errors[0].$message : null "/>

            <FormLabel for="address" label="Address" />
            <FormTextField name="address" placeholder="Address" v-model="state.data.address"></FormTextField>
                
        </div>
        <div class="px-4">
            <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
            <div :class="'flex ' + (props.isOnBoarding ? 'justify-between' : 'flex-row-reverse')">
                <FormButton v-if="props.isOnBoarding" buttonStyle="default" class="text-sm" @click="$emit('onSkipTour')">Skip Tutorial</FormButton>
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
import { projectService } from '@/components/api/ProjectService'
import { useUserStore } from '@/store/user'

const emit = defineEmits(['modalClose','onSkipTour'])

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
    },
    isOnBoarding:{
        type: Boolean,
        required: false,
        default: false
    }
})
const state = reactive({
    error: null,
    isPageLoading: false,
    data:{
        propertyid: props.selectedDataID,
        propertyname: '',
        address: ''
    },
})
onMounted(() =>{
    if(props.formStatus === 0)
        state.data.propertyid = 0
    else if(props.formStatus === 1)
        loadRecord()
})

const validators = computed(() =>{
  return {
    data: {
        propertyname: { 
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
                response = await projectService.CreateRentalProperty(state.data)
            else
                response = await projectService.UpdateRentalProperty(state.data)
            emit('modalClose', response.data)
        }catch(error){
            state.error = error.message
        }
    }
    state.isPageLoading = false
}
async function loadRecord(){
    state.isPageLoading = true
    try{
        const response = await projectService.GetRentalProperty(props.selectedDataID)
        state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>