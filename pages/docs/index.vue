<template>    
    <div>
        <NuxtLayout name="docs">
            <div class="pt-2 pb-6 px-2 sm:px-4">
                <h1 class="text-2xl font-semibold">Welcome to <span class="text-blue-700 font-bold">HexaByt</span>!</h1>
                <p class="mx-4 mt-4 text-justify"><span class="text-blue-700 font-bold">HexaByt</span> is a single platform that captures your business needs. It is also a open platform which can be integrated whatever your system your need. Meaning, our platform is growing whether surveying, real estate and many more. 
                    Discuss with us what you need to build apps that suites your business</p>
                <h1 class="mt-6 text-xl font-semibold">Getting Started!</h1>
                <h1 id="register" class="mt-6 text-lg text-blue-700 font-semibold"># Register</h1>
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2 sm:col-span-1 flex justify-center">
                        <img src="/img/docs/register.png" class="m-2 shadow-lg"/>
                    </div>
                    <div class="col-span-2 sm:col-span-1 p-2 space-y-4 text-justify">
                        <p class="text-justify">First step in using our apps is registration. You are required to fill information:</p>
                        <p class="ml-2"><span class="font-semibold">Company Name</span>: It is important to enter your Company's correct name. It will be used in all your emails, report headers and etc.</p>
                        <p class="ml-2"><span class="font-semibold">Your Name</span>: This will become the first user of your company with admin privilege.</p>
                        <p class="ml-2"><span class="font-semibold">Email</span>: This will be use to verify your identity so make sure to enter valid email. After registration, HexaByt will send a
                        confirmation email. Your email will be your username</p>
                        <p class="ml-2"><span class="font-semibold">App</span>: Select App that you will be using.</p>
                        <p>Before you register, you are required to check that you agree to HexaByt's 
                            <a href="/terms" class="text-blue-600 underline" target="_blank">Terms & Condition</a>,
                            <a href="/privacy" class="text-blue-600 underline" target="_blank">Privacy Policy</a> and 
                            <a href="/cookie" class="text-blue-600 underline" target="_blank">Cookies Policy</a></p>
                        <p>After submitting your registration, HexaByt will send a confirmation email. It contains the confirmation link along with your default password. Click `Confirm` or open the link 
                            to confirm then you can enjoy using your selected App.
                        </p>
                        <p class="p-2 text-sm border border-red-400 rounded-lg">Email may take several minutes before arriving on your inbox specially on several email server except Gmail. On some cases, the email will be tag as spam. The confirmation button may also not work on
                            other email server. Kindly copy the link and paste on your browser.
                        </p>
                    </div>
                </div>
                <div id="forgot_password">
                    <h1 class="mt-6 text-lg text-blue-700 font-semibold"># Forgot Password</h1>
                    <p class="mx-4 mt-4 text-justify">If you forgot your password, you can reset it this page. You can access this page from 
                        <a href="/login" class="text-blue-600 underline" target="_blank">Login Page</a>
                        the click `Lost Password?`.
                    </p>
                    <p class="mx-4 mt-4 text-justify">You are required to enter your email bind to your account then HexaByt will send a password reset link on your email. Once email is received, 
                        open the link and enter your new password.
                    </p>
                    <div class="mt-4 flex justify-center">
                        <img src="/img/docs/forgot_password.png" class="m-2 shadow-lg"/>
                    </div>
                    <p class="mt-4 p-2 text-sm border border-red-400 rounded-lg text-justify">Email may take several minutes before arriving on your inbox specially on several email server except Gmail. On some cases, the email will be tag as spam. The Password Reset button may also not work on
                        other email server. Kindly copy the link and paste on your browser.
                    </p>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup>

definePageMeta({
    auth: false
})


</script>