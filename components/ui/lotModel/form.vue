<template>
    <div>
        <LoadingSpinner :isActive="state.isPageLoading">
          <div class="mx-4 mt-2">
            <FormLabel for="name" label="Name" />
            <FormTextField name="name" placeholder="Name" v-model="state.data.name"></FormTextField>
            <FormError :error="v$.data.name && v$.data.name.$errors && v$.data.name.$errors.length > 0 ? v$.data.name.$errors[0].$message : null "/>
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
import { lotmodelService } from '@/components/api/LotModelService'
import { useUserStore } from '@/store/user'

const emit = defineEmits(['modalClose','onSkipTour'])


const user = useUserStore().getUser

const props = defineProps({
    project_id:{
        type: Number,
        required: true
    },
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
        id: props.selectedDataID,
        project_id: null,
        name: '',
    },
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
            state.data.project_id = props.project_id
            if(props.formStatus === 0)
                response = await lotmodelService.Create(state.data)
            else
                response = await lotmodelService.Update(state.data)
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
        const response = await lotmodelService.GetModel(props.selectedDataID)
        state.data = response.data
    }catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}
</script>