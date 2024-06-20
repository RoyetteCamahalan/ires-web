<template>
    <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
        <h3 class="mb-4 text-2xl font-semibold">Surveying Enterprise</h3>
        <p class="font-light text-gray-500 sm:text-lg">Perfect for medium to large companies</p>
        <div class="flex justify-center items-baseline my-8">
            <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 1000</span>
            <span class="text-gray-500">/month</span>
        </div>
        
        <ul role="list" class="mb-8 space-y-4 text-left">
            <li class="flex items-center space-x-3">
                
                <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                <span>Unlimited Surveys</span>
            </li>
            <li class="flex items-center space-x-3">
                
                <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                <span>Integration with <span class="text-yellow-500">Finance Monitoring App</span></span>
            </li>
            <li class="flex items-center space-x-3">
                
                
                <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                <span>Unlimited Users</span>
            </li>
            <li class="flex items-center space-x-3">
                
                
                <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                <span>Attachment Storage: <span class="font-semibold">5GB</span></span>
            </li>
            <li class="flex items-center space-x-3">
                
                
                <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                <span>Free updates: <span class="font-semibold">Lifetime</span></span>
            </li>
            <li class="flex items-center space-x-3">
                
                
                <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                <span>No setup, or hidden fees</span>
            </li>
        </ul>
        <slot></slot>
    </div>
</template>