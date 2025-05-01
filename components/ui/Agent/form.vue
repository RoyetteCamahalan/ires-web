<template>
    <div>
        <form method="POST" @submit.prevent="submitForm">
            <div class="px-6 py-2">
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="firstname" label="First Name" />
                        <FormTextField name="firstname" placeholder="First Name" v-model="state.data.firstname"/>
                        <FormError :error="v$.data.firstname && v$.data.firstname.$errors && v$.data.firstname.$errors.length > 0 ? v$.data.firstname.$errors[0].$message : null "/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="lastname" label="Last Name" />
                        <FormTextField name="lastname" placeholder="Last Name" v-model="state.data.lastname"/>
                        <FormError :error="v$.data.lastname && v$.data.lastname.$errors && v$.data.lastname.$errors.length > 0 ? v$.data.lastname.$errors[0].$message : null "/>
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="mobile" label="Contact No" />
                        <FormTextField name="mobileno" placeholder="Contact No" v-model="state.data.contactno"/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="email" label="Email" />
                        <FormTextField name="email" placeholder="Email" v-model="state.data.email"/>
                    </div>
                </div>
                <div>
                    <FormLabel for="address" label="Address" />
                    <FormTextField name="address" placeholder="Address" v-model="state.data.address"/>
                </div>
                <div>
                    <FormLabel for="tin" label="TIN" />
                    <FormTextField name="tin" placeholder="Tax Identification Number" v-model="state.data.tinnumber"/>
                </div>
                <div>
                      <FormLabel for="upline" label="Upline Agent" />
                      <FormSelectAgent :default-option="state.upline" v-model="state.data.upline_id"></FormSelectAgent>
                  </div>
                <div class="flex mt-2">
                    <FormCheckBox v-model="state.data.isactive" class="my-auto"></FormCheckBox>
                    <FormLabel for="isactive" label="Is Active?" />
                </div>
                <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
            </div>

            <div class="px-6 py-3 flex flex-row-reverse rounded-b border-t border-gray-200">
                <FormButton type="submit" buttonStyle="primary" class="w-min">Save</FormButton>
            </div>
        </form>
    </div>
</template>
<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useUserStore } from '@/store/user'
import { agentService } from '@/components/api/AgentService';
import moment from 'moment'

const emit = defineEmits(['modalClose'])

const props = defineProps({
    formStatusEdit:{
        type: Boolean,
        required: false,
        default: 0
    },
    selectedGuid:{
        type: String,
        required: false,
        default: ''
    }
})

const user = useUserStore().getUser

const state = reactive({
    error: '',
    data:{
        guid: '',
        firstname: '',
        lastname: '',
        address: '',
        contactno: '',
        tinnumber: '',
        email: '',
        isactive: true,
        upline_id: null
    },
    upline: null
})
const validators = computed(()=>{
    return{
        data: {
            firstname: { required: helpers.withMessage('This field is required.', required) },
            lastname: { required: helpers.withMessage('This field is required.', required) },
        }
    }
})

const v$ = useVuelidate(validators, state)

onMounted(async () =>{
    if(props.formStatusEdit){
        try{
            var response = await agentService.getDetails(props.selectedGuid)
            state.data.guid = props.selectedGuid
            state.data.firstname = response.data.firstname
            state.data.lastname = response.data.lastname
            state.data.address = response.data.address
            state.data.contactno = response.data.contactno
            state.data.tinnumber = response.data.tinnumber
            state.data.email = response.data.email
            state.data.isactive = response.data.isactive
            state.data.upline_id = response.data.upline_id
            if(response.data.upline)
                state.upline = { value: response.data.upline.id, label: response.data.upline.fullname }
            console.log(state.upline)
        }
        catch(error){
            state.error = error.message
        }
    }
})

const submitForm = async () => {
    v$.value.$validate()
    if(!v$.value.$error){
        try{
            if(state.isCompany){
                state.data.firstname = ''
                state.data.middname = ''
            }

            let response
            if(props.formStatusEdit)
                response = await agentService.update(state.data)
            else
                response = await agentService.create(state.data)
            emit('modalClose', true, response.data)
        }
        catch(error){
            state.error = error.message
        }
    }
}
</script>