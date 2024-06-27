<template>
    <div class="m-2">
        <div class="flex">
            <img v-if="user.company.logo && user.company.logo.length > 0" :src="runtimeConfig.public.apiBaseURL + '/attachments/' + user.companyid + '/' + user.company.logo" 
            class="h-14 my-auto">
            <div class="ml-2">
                <p class="text-lg font-semibold">{{ user.company.name }}</p>
                <p class="text-sm">{{ user.company.address }}</p>
                <p class="text-sm">{{ user.company.contactno }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from '@/store/user';

const user = useUserStore().getUser
const runtimeConfig = useRuntimeConfig()


</script>