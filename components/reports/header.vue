<template>
    <div>
        <p class="text-lg font-semibold">{{ user.company.name }}</p>
        <p class="text-sm">{{ user.company.address }}</p>
        <p class="text-sm">{{ user.company.contactno }}</p>
    </div>
</template>
<script setup>
import { useUserStore } from '@/store/user';

const user = useUserStore().getUser

</script>