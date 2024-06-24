<template>
    <div class="w-full bg-white rounded-lg">
        <div class="w-full flex justify-center pt-8">
            <img class="w-20 h-20" src="/img/logo.png"/>
        </div>
        <div class="w-full flex justify-center pt-6">
            <h2 class="text-2xl font-bold text-blue-500">Welcome to {{ runtimeConfig.public.appName }}!</h2>
        </div>
        <div v-if="props.hasTour" class="w-full text-center pt-8 text-gray-700 text-sm px-10">
            <p>Let's start setting up things and you will be up</p>
            <p> and running in no time!</p>
        </div>
        <div v-else class="w-full text-center pt-8 text-gray-700 text-sm px-10">
            <p>We are so happy to have you on board! If you have questions</p>
            <p>along the way, visit our home page and chat with us. </p>
            <p>We are more than happy to help!</p>
        </div>
        <div class="w-full flex justify-center py-6">
            <LoadingSpinner :isActive="props.isLoading">
                <button 
                    @click="$emit('onStart')"
                    class="py-1 px-6 bg-blue-500 text-white font-semibold rounded-full">Get Started</button>
            </LoadingSpinner>
        </div>
    </div>
</template>
<script setup>
import { plan } from '@/contants/consts';

const runtimeConfig = useRuntimeConfig()

const emit = defineEmits(['onStart'])
const props = defineProps({
    isLoading: {
        type: Boolean,
        required: false,
        default: false
    },
    hasTour: {
        type: Boolean,
        required: false,
        default: false
    }
})


</script>