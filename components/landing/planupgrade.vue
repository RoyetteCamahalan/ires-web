<template>
    <section class="mt-4 bg-white dark:bg-gray-900">
        <div id="pricing" class="py-2 px-4 mx-auto max-w-screen-xl lg:px-6">
        <div data-aos="zoom-in" class="mx-auto max-w-screen-md text-center mb-4 lg:mb-4 aos-init aos-animate">
            <h2 class="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">Select Plan</h2>
            <div class="absolute top-0 right-0 mt-2">
                <button
                    @click="$emit('upgradePlan', 0)">
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
        <div class="space-y-4 lg:grid lg:grid-cols-2 sm:gap-2 xl:gap-6 lg:space-y-0">
            <!-- Pricing Card -->
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">Surveying Pro</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for start up professionals</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 400</span>
                    <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <!-- List -->
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Surveys</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense & Petty Cash Monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Users</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Attachment Storage: <span class="font-semibold">1GB</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Free updates: <span class="font-semibold">Lifetime</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>No setup, or hidden fees</span>
                    </li>
                </ul>
                <button class="px-3 py-2 bg-blue-600 text-white text-sm rounded-xl" :class="props.currentPlanID >= 1 && 'opacity-50 cursor-not-allowed'"
                    @click="$emit('upgradePlan', 1)">Select Plan</button>
            </div>
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">Surveying Enterprise</h3>
                <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Perfect for medium to large companies</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 700</span>
                    <span class="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <!-- List -->
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Surveys</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense & Petty Cash Monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Users</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Attachment Storage: <span class="font-semibold">5GB</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Free updates: <span class="font-semibold">Lifetime</span></span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <!-- Icon -->
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>No setup, or hidden fees</span>
                    </li>
                </ul>
                <button class="px-3 py-2 bg-blue-600 text-white text-sm rounded-xl" :class="props.currentPlanID >= 2 && 'opacity-50 cursor-not-allowed'"
                    @click="$emit('upgradePlan', 2)">Select Plan</button>
            </div>
        </div>
    </div>
    </section>
</template>
<script setup>

const props = defineProps({
    currentPlanID:{
        type: Number,
        required: true
    }
})

const emit = defineEmits(['upgradePlan'])

</script>