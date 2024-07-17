<template>    
    <div>
        <NuxtLayout name="docs">
            <div class="pt-2 pb-6 px-2 sm:px-4">
                <h1 class="text-xl font-semibold">Frequently Ask Questions</h1>
                <div class="mt-4 space-y-2">
                    <h1 class="text-lg text-gray-700">General</h1>
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                        class="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-bue-400/75"
                        >
                        <span>What if after the registration, the email confirmation did not arrive?</span>
                        <Icon
                            :name="open ? 'mdi:chevron-down' : 'mdi:chevron-up'"
                            class="h-5 w-5 text-blue-600" ></Icon>
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                        Go to login page then enter your email address and password. The app will pop a message saying your the account is unverified. At the bottom, click `Resend Link`.
                        </DisclosurePanel>
                    </Disclosure>
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                        class="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-bue-400/75"
                        >
                        <span>What to do if email used in registration is incorrect?</span>
                        <Icon
                            :name="open ? 'mdi:chevron-down' : 'mdi:chevron-up'"
                            class="h-5 w-5 text-blue-600" ></Icon>
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                        You can register again using the corect email but the company name should not be the same as the first (You can add extra character if you want) and
                        update your company name later.
                        </DisclosurePanel>
                    </Disclosure>
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                        class="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-bue-400/75"
                        >
                        <span>How to update my company information?</span>
                        <Icon
                            :name="open ? 'mdi:chevron-down' : 'mdi:chevron-up'"
                            class="h-5 w-5 text-blue-600" ></Icon>
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                        In the upper right corner of the app, click your profile then go to `Company Information`. You edit other info except for the verified email. If you wish to update
                        the company email, you can message us at <a href="mailto:admin@hexabyt.com" class="text-blue-600 font-semibold">admin@hexabyt.com</a>.
                        </DisclosurePanel>
                    </Disclosure>
                </div>

                
                
                <div class="mt-4 space-y-2">
                    <h1 class="text-lg text-gray-700">Payment</h1>                    
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                        class="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-bue-400/75"
                        >
                        <span>What if the payment was encoded incorrectly?</span>
                        <Icon
                            :name="open ? 'mdi:chevron-down' : 'mdi:chevron-up'"
                            class="h-5 w-5 text-blue-600" ></Icon>
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                        With admin access, you can void the payment and create new payment.
                        </DisclosurePanel>
                    </Disclosure>
                </div>



                <div class="mt-4 space-y-2">
                    <h1 class="text-lg text-gray-700">Subscription and Plan</h1>
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                        class="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-bue-400/75"
                        >
                        <span>How to make payment for my subscription?</span>
                        <Icon
                            :name="open ? 'mdi:chevron-down' : 'mdi:chevron-up'"
                            class="h-5 w-5 text-blue-600" ></Icon>
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                        You can visit your account's billing page then select your unpaid invoice then click `Pay`.
                        </DisclosurePanel>
                    </Disclosure>
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                        class="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-bue-400/75"
                        >
                        <span>What happens to my account if I failed to pay my subscription resulting to account expiration?</span>
                        <Icon
                            :name="open ? 'mdi:chevron-down' : 'mdi:chevron-up'"
                            class="h-5 w-5 text-blue-600" ></Icon>
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                        You can still login to your account but most transactions are unavailable until the payment has been settled.
                        </DisclosurePanel>
                    </Disclosure>
                    <Disclosure v-slot="{ open }">
                        <DisclosureButton
                        class="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-bue-400/75"
                        >
                        <span>How to subscribe multiple apps?</span>
                        <Icon
                            :name="open ? 'mdi:chevron-down' : 'mdi:chevron-up'"
                            class="h-5 w-5 text-blue-600" ></Icon>
                        </DisclosureButton>
                        <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                        If you wish to use two apps in one dashboard, you can message us at <a href="mailto:admin@hexabyt.com" class="text-blue-600 font-semibold">admin@hexabyt.com</a>.
                        We may offer much cheaper plan when merge than using individually.
                        </DisclosurePanel>
                    </Disclosure>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

definePageMeta({
    auth: false
})


</script>