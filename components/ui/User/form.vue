<template>
    <div>
        <form method="POST" @submit.prevent="submitForm">
            <div class="p-6">
                <div v-if="state.page === 1">
                        <div class="flex justify-between mb-2">
                            <h2 class="text-gray-700 font-semibold text-lg">Basic Info</h2>
                            <div class="flex flex-row-reverse flex-1">
                                <FormSwitch :value="state.user.isactive"
                                    @toggleSwitch="state.user.isactive = !state.user.isactive" />
                                <FormLabel for="isactive" label="Is Active?" class="mr-2 mt-0" />
                            </div>
                        </div>
                            <div class="grid grid-cols-6 gap-4">
                                <div class="col-span-6 sm:col-span-3">
                                    <FormLabel for="firstname" label="First Name" />
                                    <FormTextField name="firstname" placeholder="First Name" v-model="state.user.firstname"/>
                                    <FormError :error="v$.user.firstname && v$.user.firstname.$errors && v$.user.firstname.$errors.length > 0 ? v$.user.firstname.$errors[0].$message : null "/>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <FormLabel for="lastname" label="Last Name" />
                                    <FormTextField name="lastname" placeholder="Last Name" v-model="state.user.lastname"/>
                                    <FormError :error="v$.user.lastname && v$.user.lastname.$errors && v$.user.lastname.$errors.length > 0 ? v$.user.lastname.$errors[0].$message : null "/>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <FormLabel for="middlename" label="Middle Name"/>
                                    <FormTextField name="middlename" placeholder="Middle Name" v-model="state.user.middlename"/>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <FormLabel for="gender" label="Gender" />
                                    <FormSelect name="gender" :options="genderOptions" :searchable="false" v-model="state.user.gender"></FormSelect>
                                    <FormError :error="v$.user.gender && v$.user.gender.$errors && v$.user.gender.$errors.length > 0 ? v$.user.gender.$errors[0].$message : null "/>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <FormLabel for="mobile" label="Mobile No" />
                                    <FormTextField name="mobileno" placeholder="Mobile No" v-model="state.user.mobileno"/>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <FormLabel for="designation" label="Designation" />
                                    <FormTextField name="designation" placeholder="Designation" v-model="state.user.designation"/>
                                    <FormError :error="v$.user.designation && v$.user.designation.$errors && v$.user.designation.$errors.length > 0 ? v$.user.designation.$errors[0].$message : null "/>
                                </div>
                            </div>
                </div>
                <div v-else>
                    <div class="flex justify-between mb-2">
                        <h2 class="text-gray-700 font-semibold text-lg">Account Credentials</h2>
                        <div class="flex flex-row-reverse flex-1">
                            <FormSwitch :value="state.user.isappsysadmin"
                                @toggleSwitch="state.user.isappsysadmin = !state.user.isappsysadmin" />
                            <FormLabel for="isactive" label="Is Admin?" class="mr-2 mt-0" />
                        </div>
                    </div>
                    
                    <div class="w-full">
                        <div class="grid grid-cols-6 gap-4">
                            <div class="col-span-6 sm:col-span-3">
                                <FormLabel for="email" label="Email" />
                                <FormTextField name="email" placeholder="Email" v-model="state.user.email"/>
                                <FormError :error="vaccount$.user.email && vaccount$.user.email.$errors && vaccount$.user.email.$errors.length > 0 ? vaccount$.user.email.$errors[0].$message : null "/>
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <FormLabel for="username" label="Username" />
                                <FormTextField name="username" placeholder="Username" v-model="state.user.username"/>
                                <FormError :error="vaccount$.user.username && vaccount$.user.username.$errors && vaccount$.user.username.$errors.length > 0 ? vaccount$.user.username.$errors[0].$message : null "/>
                            </div>
                        </div>
                        <p class="text-xs text-gray-500" v-if="formStatusEdit">*Password edit not allowed</p>
                        <FormLabel for="password" label="Password" />
                        <FormPasswordField name="password" placeholder="Password" v-model="state.user.userpass" :disabled="formStatusEdit"/>
                        <FormError :error="vaccount$.user.userpass && vaccount$.user.userpass.$errors && vaccount$.user.userpass.$errors.length > 0 ? vaccount$.user.userpass.$errors[0].$message : null "/>

                        <FormLabel for="confirmpassword" label="Confirm Password" />
                        <FormPasswordField name="confirmpassword" placeholder="Confirm Password" v-model="state.user.confirmpassword" :disabled="formStatusEdit"/>
                        <FormError :error="vaccount$.user.confirmpassword && vaccount$.user.confirmpassword.$errors && vaccount$.user.confirmpassword.$errors.length > 0 ? vaccount$.user.confirmpassword.$errors[0].$message : null "/>
                        <FormError :error="state.error && state.error.length > 0 ? state.error : null "/>
                    </div>
                </div>
                            <!-- <FormError :error="v$.company.name && v$.company.name.$errors && v$.company.name.$errors.length > 0 ? v$.company.name.$errors[0].$message : null "/> -->
            </div>

            <div class="px-6 py-3 flex justify-between rounded-b border-t border-gray-200">
                <div>
                    <FormButton type="button" buttonStyle="default" class="w-min" v-if="state.page === 2" @click="setPage(1)">Back</FormButton>
                </div>
                <FormButton type="button" buttonStyle="primary" class="w-min" v-if="state.page === 1" @click="setPage(2)">Next</FormButton>
                <FormButton type="submit" buttonStyle="primary" class="w-min" v-if="state.page === 2">Save</FormButton>
            </div>
        </form>
    </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useUserStore } from '@/store/user'
import { employeeService } from '~~/components/api/EmployeeService'

export default {
    props: ['formStatusEdit', 'selectedUserID'],
    emits: ['modalClose'],
    setup(props, { emit }){
        
        const user = useUserStore().getUser

        const state = reactive({
            error: '',
            page: 1,
            user:{
                employeeid: 0,
                companyid: user.companyid,
                // firstname: 'Meriel',
                // lastname: 'Camahalan',
                // middlename: '',
                // gender: 'F',
                // mobileno: '',
                // email: 'meriel@gmail.com',
                // username: 'meriel',
                // userpass: '123456',
                // confirmpassword: '123456',
                firstname: '',
                lastname: '',
                middlename: '',
                gender: '',
                mobileno: '',
                email: '',
                username: '',
                userpass: '',
                confirmpassword: '',
                designation: '',
                isactive: true,
                isappsysadmin: false,
                createdbyid : user.employeeid
            }
        })

        const genderOptions = [ { value: 'M', label: 'Male'}, { value: 'F', label: 'Female'}]

        const validators = computed(()=>{
            return{
                user: {
                    firstname: { required: helpers.withMessage('This field is required.', required) },
                    lastname: { required: helpers.withMessage('This field is required.', required) },
                    gender: { required: helpers.withMessage('This field is required.', required) },
                }
            }
        })
        const accountvalidators = computed(()=>{
            let v = {
                user: {
                    email: { 
                        required: helpers.withMessage('This field is required.', required),
                        email: helpers.withMessage('Please enter a valid email address.', email)
                    },
                    username: { 
                        required: helpers.withMessage('This field is required.', required),
                        minLength: helpers.withMessage('Atleast 6 characters required.', minLength(6))
                    },
                }
            }
            if(!props.formStatusEdit){
                v.user.userpass = { 
                        required: helpers.withMessage('This field is required.', required),
                        minLength: helpers.withMessage('Atleast 6 characters required.', minLength(6))
                    }
                v.user.confirmpassword = { 
                        required: helpers.withMessage('This field is required.', required),
                        sameAs: helpers.withMessage('Must be the same as password.', sameAs(state.user.userpass))
                    }
            }
            return v
        })
        
        const v$ = useVuelidate(validators, state)
        const vaccount$ = useVuelidate(accountvalidators, state)

        const setPage = (value) =>{
            if(value === 2){
                v$.value.$validate()
                if(!v$.value.$error)
                    state.page = value
            }
            else
                state.page = value
        }

        onMounted(async () =>{
            if(props.formStatusEdit){
                try{
                    var response = await employeeService.getDetails(props.selectedUserID)
                    state.user.employeeid = props.selectedUserID
                    state.user.firstname = response.data.firstname
                    state.user.lastname = response.data.lastname
                    state.user.middlename = response.data.middlename
                    state.user.gender = response.data.gender
                    state.user.mobileno = response.data.mobileno
                    state.user.designation = response.data.designation
                    state.user.email = response.data.email
                    state.user.username = response.data.username
                    state.user.isactive = response.data.isactive
                    state.user.isappsysadmin = response.data.isappsysadmin
                }
                catch(error){
                    state.error = error.message
                }
            }
        })

        const submitForm = async () => {
            v$.value.$validate()
            vaccount$.value.$validate()
            if(!(v$.value.$error || vaccount$.value.$error)){
                try{
                    console.log(state.user)
                    if(props.formStatusEdit)
                        await employeeService.update(state.user)
                    else
                        await employeeService.create(state.user)
                    emit('modalClose', true)
                }
                catch(error){
                    state.error = error.message
                }
            }
        }

        return{
            v$,
            vaccount$,
            state,
            genderOptions,
            setPage,
            submitForm
        }
    }
}
</script>