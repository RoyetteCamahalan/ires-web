<template>
    <div>
        <form method="POST" @submit.prevent="submitForm">
            <div class="px-6 py-2">
                <div class="flex">
                    <FormSwitch 
                        :value="state.isCompany"
                        @toggleSwitch="state.isCompany = !state.isCompany"></FormSwitch>
                    <label class="ml-1 my-auto text-sm font-semibold text-blue-600">Client is a Company</label>
                </div>
                <div
                    v-if="state.isCompany" 
                    class="col-span-6 sm:col-span-3">
                    <FormLabel for="companyname" label="Company Name" />
                    <FormTextField name="companyname" placeholder="Company Name" v-model="state.client.lname"/>
                    <FormError :error="v$.client.lname && v$.client.lname.$errors && v$.client.lname.$errors.length > 0 ? v$.client.lname.$errors[0].$message : null "/>
                </div>
                <div
                    v-if="!state.isCompany" 
                    class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="fname" label="First Name" />
                        <FormTextField name="fname" placeholder="First Name" v-model="state.client.fname"/>
                        <FormError :error="v$.client.fname && v$.client.fname.$errors && v$.client.fname.$errors.length > 0 ? v$.client.fname.$errors[0].$message : null "/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="lname" label="Last Name" />
                        <FormTextField name="lname" placeholder="Last Name" v-model="state.client.lname"/>
                        <FormError :error="v$.client.lname && v$.client.lname.$errors && v$.client.lname.$errors.length > 0 ? v$.client.lname.$errors[0].$message : null "/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="mname" label="Middle Name"/>
                        <FormTextField name="mname" placeholder="Middle Name" v-model="state.client.mname"/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="birthdate" label="Birthdate" />
                        <FormDateField name="birthdate" placeholder="Birthdate" v-model="state.client.birthdate" />
                    </div>
                </div>
                <div class="grid grid-cols-6 gap-4">
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="mobile" label="Mobile No" />
                        <FormTextField name="mobileno" placeholder="Mobile No" v-model="state.client.contactno"/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <FormLabel for="email" label="Email" />
                        <FormTextField name="email" placeholder="Email" v-model="state.client.email"/>
                    </div>
                </div>
                <div>
                    <FormLabel for="tin" label="TIN" />
                    <FormTextField name="tin" placeholder="Tax Identification Number" v-model="state.client.tinnumber"/>
                </div>
                <div>
                    <FormLabel for="address" label="Address" />
                    <FormTextField name="address" placeholder="Address" v-model="state.client.address"/>
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
import { clientService } from '@/components/api/ClientService'
import moment from 'moment'

const emit = defineEmits(['modalClose'])

const props = defineProps({
    formStatusEdit:{
        type: Boolean,
        required: false,
        default: 0
    },
    selectedClientID:{
        type: Number,
        required: false,
        default: 0
    }
})

const user = useUserStore().getUser

const state = reactive({
    error: '',
    isCompany: false,
    client:{
        custid: 0,
        companyid: user.companyid,
        // fname: 'Nathan',
        // lname: 'Gempesaw',
        // mname: '',
        // birthdate: '1995-10-29',
        // address: '',
        // contactno: '09123456789',
        // tinnumber: '000-000-000',
        // email: 'nathan@gmail.com',
        fname: '',
        lname: '',
        mname: '',
        birthdate: '1990-01-01',
        address: '',
        contactno: '',
        tinnumber: '',
        email: '',
        createdbyid: user.employeeid,
        updatedbyid: user.employeeid
    }
})
const FirstNameValidator = (value) => helpers.req(value) || state.isCompany
const validators = computed(()=>{
    return{
        client: {
            fname: FirstNameValidator ,
            lname: { required: helpers.withMessage('This field is required.', required) },
        }
    }
})

const v$ = useVuelidate(validators, state)

onMounted(async () =>{
    if(props.formStatusEdit){
        try{
            var response = await clientService.getDetails(props.selectedClientID)
            state.client.custid = props.selectedClientID
            state.client.fname = response.data.fname
            state.client.lname = response.data.lname
            state.client.mname = response.data.mname
            state.client.birthdate = moment(response.data.birthdate).format('YYYY-MM-DD')
            state.client.address = response.data.address
            state.client.contactno = response.data.contactno
            state.client.tinnumber = response.data.tinnumber
            state.client.email = response.data.email
            state.isCompany = response.data.fname === ''
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
                state.client.fname = ''
                state.client.mname = ''
            }

            let response
            if(props.formStatusEdit)
                response = await clientService.update(state.client)
            else
                response = await clientService.create(state.client)
            emit('modalClose', true, response.data)
        }
        catch(error){
            state.error = error.message
        }
    }
}
</script>