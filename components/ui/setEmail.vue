<template>
    <div class="flex flex-col justify-center items-center px-6 my-auto mx-auto pt:mt-0">
        <div class="pt-4 w-full max-w-lg bg-white rounded-2xl shadow-lg shadow-gray-300">
            <div class="space-y-8">
                <div class="pl-10 pr-4 flex justify-between items-start rounded-t">
                    <h2 class="text-lg font-semibold text-gray-900 my-auto"></h2>
                    <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                    @click="$emit('modalClose')">
                    <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                        ></path>
                    </svg>
                    </button>
                </div>
            </div>
            <div class="mx-4 mt-2">
                <FormLabel for="email" label="Destination Email" />
                <FormTextField name="email" placeholder="Destination Email" v-model="state.email"></FormTextField>
                <FormError :error="v$.email && v$.email.$errors && v$.email.$errors.length > 0 ? v$.email.$errors[0].$message : null "/>                
            </div>
            <div class="px-4">
                <div class="flex flex-row-reverse">
                    <FormButton buttonStyle="primary" class="text-sm" @click="Submit">Submit</FormButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email,helpers } from '@vuelidate/validators'


const emit = defineEmits(["modalClose"])

const props = defineProps({
    email: {
        type: String,
        required: true,
        default: ''
    }
})

const state = reactive({
    email: props.email
})

const validators = computed(() =>{
    return {
        email: { 
            required: helpers.withMessage('This field is required.', required),
            email: helpers.withMessage('Please enter a valid email address.', email)
        },
    }
})

const v$ = useVuelidate(validators, state);

async function Submit(){
    v$.value.$validate()
    if(!v$.value.$error){
        emit('modalClose', state.email)
    }
}
</script>