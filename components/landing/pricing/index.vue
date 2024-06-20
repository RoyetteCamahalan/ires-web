<template>
    <section class="mt-8 bg-white">
        <div id="pricing" class="py-4 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div data-aos="zoom-in" class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 aos-init aos-animate">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Our Pricing</h2>
        </div>
        <div data-aos="zoom-in" class="mx-auto max-w-screen-md text-center mb-2 lg:mb-4 aos-init aos-animate">
            <h2 class="mb-4 text-lg font-extrabold text-gray-900">Rental Management App</h2>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <LandingPricingRentalFreetrial></LandingPricingRentalFreetrial>
            <LandingPricingRentalPro></LandingPricingRentalPro>
            <LandingPricingRentalEnterprise></LandingPricingRentalEnterprise>
        </div>
        <div data-aos="zoom-in" class="mx-auto max-w-screen-md text-center mb-2 mt-12 lg:mb-4 aos-init aos-animate">
            <h2 class="mb-4 text-lg font-extrabold text-gray-900">Surveying Management App</h2>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <LandingPricingSurveyFreetrial></LandingPricingSurveyFreetrial>
            <LandingPricingSurveyPro></LandingPricingSurveyPro>
            <LandingPricingSurveyEnterprise></LandingPricingSurveyEnterprise>
        </div>
        <div data-aos="zoom-in" class="mx-auto max-w-screen-md text-center mb-2 mt-12 lg:mb-4 aos-init aos-animate">
            <h2 class="mb-4 text-lg font-extrabold text-gray-900">Finance Monitoring App</h2>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">Finance - 30 Days Trial</h3>
                <p class="font-light text-gray-500 sm:text-lg">Its free while you explore.</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">Free</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense and Petty Cash monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Accounts Payable tracking</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Users</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Attachment Storage: <span class="font-semibold">1GB</span></span>
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
            </div>
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">Finance Pro</h3>
                <p class="font-light text-gray-500 sm:text-lg">Relevant for start up companies</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 100</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense and Petty Cash monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Accounts Payable tracking</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Users</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Attachment Storage: <span class="font-semibold">1GB</span></span>
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
            </div>
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">Finance Enterprise</h3>
                <p class="font-light text-gray-500 sm:text-lg">Perfect for medium to large companies</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 300</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense and Petty Cash monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Accounts Payable tracking</span>
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
            </div>
        </div>
        <!-- <div data-aos="zoom-in" class="mx-auto max-w-screen-md text-center mt-8 mb-2 pt-2 lg:mb-4 border-t aos-init aos-animate hidden">
            <h2 class="mb-4 text-lg font-extrabold text-gray-900">Rental Management App</h2>
        </div> -->
        <!-- <div class="mt-4 space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 hidden">
            
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">Rental - 60 Days Trial</h3>
                <p class="font-light text-gray-500 sm:text-lg">Its free while you explore.</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">Free</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>50 Properties</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense & Petty Cash Monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Users</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Attachment Storage: <span class="font-semibold">1GB</span></span>
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
            </div>
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">Rental Pro</h3>
                <p class="font-light text-gray-500 sm:text-lg">Relevant for start up professionals</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 400</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>50 Properties</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense & Petty Cash Monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Users</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Attachment Storage: <span class="font-semibold">1GB</span></span>
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
            </div>
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">Rental Enterprise</h3>
                <p class="font-light text-gray-500 sm:text-lg">Perfect for medium to large companies</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 700</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Properties</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense & Petty Cash Monitoring</span>
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
            </div>
        </div> -->
        <!-- <div data-aos="zoom-in" class="mx-auto max-w-screen-md text-center mt-8 mb-2 pt-2 lg:mb-4 border-t aos-init aos-animate hidden">
            <h2 class="mb-4 text-lg font-extrabold text-gray-900">Real Estate Management App (REMS)</h2>
        </div>
        <div class="mt-4 space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 hidden">
            
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">REMS - 60 Days Trial</h3>
                <p class="font-light text-gray-500 sm:text-lg">Its free while you explore.</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">Free</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Up to 5,000 Properties</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Payment and Interest Collection</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Agent Commissions</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense & Petty Cash Monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Users</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Attachment Storage: <span class="font-semibold">1GB</span></span>
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
            </div>
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">REMS Pro</h3>
                <p class="font-light text-gray-500 sm:text-lg">Relevant for start up companies</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 1,600</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Up to 5,000 Properties</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Payment and Interest Collection</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Agent Commissions</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense & Petty Cash Monitoring</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Users</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Attachment Storage: <span class="font-semibold">1GB</span></span>
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
            </div>
            <div data-aos="zoom-in" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 aos-init aos-animate">
                <h3 class="mb-4 text-2xl font-semibold">REMS Enterprise</h3>
                <p class="font-light text-gray-500 sm:text-lg">Perfect for medium to large companies</p>
                <div class="flex justify-center items-baseline my-8">
                    <span class="mr-2 text-3xl text-blue-700 font-extrabold">P 2,500</span>
                    <span class="text-gray-500">/month</span>
                </div>
                
                <ul role="list" class="mb-8 space-y-4 text-left">
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Unlimited Properties</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Payment and Interest Collection</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Agent Commissions</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        
                        <Icon name="ic:baseline-check" class="flex-shrink-0 w-5 h-5 text-green-500"></Icon>
                        <span>Expense & Petty Cash Monitoring</span>
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
            </div>
        </div> -->
    </div>
    </section>
</template>