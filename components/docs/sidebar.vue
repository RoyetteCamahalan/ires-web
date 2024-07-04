<template>
    <aside
      id="sidebar"
      class="flex fixed top-0 left-0 flex-col flex-shrink-0 h-full pt-16 w-64 duration-200 lg:flex transition-width" :class="!sidebarOpen && !openHoverState ? ' lg:w-0' : ' z-20 lg:w-64'"
      aria-label="Sidebar"
      @mouseenter="$emit('onSideBarEnter')"
      @mouseleave="$emit('onSideBarLeave')"
    >
      <div class="flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50 md:flex" :class="sidebarOpen ? '' : ' hidden'">
        <div class="flex overflow-x-hidden flex-col flex-1 pt-4 pb-4">
          <div class="flex-1 px-3 bg-gray-50" id="sidebar-items">
            <ul class="pb-2 pt-1 px-2">
                <li class="flex justify-center">
                    <img src="/img/banner.png" class="h-8">
                </li>
                <li class="mt-4">
                    <button 
                        @click="toggleMenu('gettingstarted')"
                        type="button"
                        class="w-full flex items-center text-base font-normal text-gray-800 py-2 bg-white  rounded-lg group transition-all duration-200">
                        <span class="ml-3 text-dark-500">Getting Started</span>
                    </button>
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <ul 
                            v-if="state.pageCurrent && state.pageCurrent.gettingstarted"
                            class="pb-2 pt-1 bg-white">
                            <li class="ml-2 mt-1">
                                <a 
                                    href="/docs"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Register and Login
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a 
                                    href="/docs#forgot_password"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Forgot Password
                                </a>
                            </li>
                        </ul>
                    </transition>
                </li>
                <li class="mt-2">
                    <button 
                        type="button"
                        @click="toggleMenu('rental')"
                        class="w-full flex items-center text-base font-normal text-gray-800 py-2 bg-white  rounded-lg group transition-all duration-200">
                        <span class="ml-3 text-dark-500">Rental App</span>
                    </button>
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <ul 
                            v-if="state.pageCurrent && state.pageCurrent.rental"
                            class="pb-2 pt-1 bg-white">
                            <li class="ml-2 mt-1">
                                <a
                                    href="/docs/rental#building"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Buildings and Rental Units
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/rental#create_contract"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Create Contracts
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/rental#manage_contract"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Manage Contract
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/rental#attachments"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Attachments
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/rental#other_fees"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Other Fees
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/rental#payments"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Payments
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/rental#creditmemo"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Credit Memo
                                </a>
                            </li>
                        </ul>
                    </transition>
                </li>
                <li class="mt-2">
                    <button 
                        @click="toggleMenu('surveying')"
                        class="w-full flex items-center text-base font-normal text-gray-800 py-2 bg-white  rounded-lg group transition-all duration-200">
                        <span class="ml-3 text-dark-500">Surveying App</span>
                    </button>
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <ul 
                            v-if="state.pageCurrent && state.pageCurrent.surveying"
                            class="pb-2 pt-1 bg-white">
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/survey"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Manage Surveys
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/survey#attachments"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Attachments
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/survey#payments"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Payments
                                </a>
                            </li>
                        </ul>
                    </transition>
                </li>
                <li class="mt-2">
                    <button 
                        @click="toggleMenu('finance')"
                        class="w-full flex items-center text-base font-normal text-gray-800 py-2 bg-white  rounded-lg group transition-all duration-200">
                        <span class="ml-3 text-dark-500">Finance App</span>
                    </button>
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <ul 
                            v-if="state.pageCurrent && state.pageCurrent.finance"
                            class="pb-2 pt-1 bg-white">
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/finance"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Overview
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/finance#pettycash"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Petty Cash
                                </a>
                            </li>
                            <li class="ml-2 mt-2">
                                <a
                                    href="/docs/finance#manage_expenses"
                                    class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Manage Expenses
                                </a>
                            </li>
                        </ul>
                    </transition>
                </li>
                <li class="mt-2">
                    <button 
                        @click="navigateTo('/docs/usermanagement')"
                        class="w-full flex items-center text-base font-normal text-gray-800 py-2 bg-white  rounded-lg group transition-all duration-200">
                        <span class="ml-3 text-dark-500">User Management</span>
                    </button>
                </li>
                <!-- <li class="mt-2">
                    <button 
                        @click="toggleMenu('subscription')"
                        class="w-full flex items-center text-base font-normal text-gray-800 py-2 bg-white  rounded-lg group transition-all duration-200">
                        <span class="ml-3 text-dark-500">My Subscription</span>
                    </button>
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <ul 
                            v-if="state.pageCurrent && state.pageCurrent.subscription"
                            class="pb-2 pt-1 bg-white">
                            <li class="ml-2 mt-1">
                                <button type="button" class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Upgrading Plan
                                </button>
                            </li>
                            <li class="ml-2 mt-2">
                                <button type="button" class="flex ml-3 text-sm text-gray-600 hover:text-blue-400">
                                    <div class="hidden w-2 h-2 bg-blue-500 rounded-full my-auto mr-1"></div>
                                    Pay Invoices
                                </button>
                            </li>
                        </ul>
                    </transition>
                </li> -->
            </ul>
          </div>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { usePrefStore } from '@/store/pref'
  
  const prefStore = usePrefStore()
  
  const route = useRoute()
  
  const activeMenu = 'bg-blue-500 text-white'
  
  const props = defineProps({
    sidebarOpen:{
      type: Boolean,
      required: true
    },
    openHoverState:{
      type: Boolean,
      required: true
    }
  })

  console.log(route.path)
  
  const state = reactive({
    searchString: '',
    isSurveying: true,
    isRental: true,
    pageCurrent: {
        gettingstarted: route.path.startsWith('/docs'),
        rental: route.path.startsWith('/docs/rental'),
        surveying: route.path.startsWith('/docs/survey'),
        finance: route.path.startsWith('/docs/finance')
    }
  })

  function toggleMenu(menu){
    if(!state.pageCurrent)
        state.pageCurrent = { [menu]: true }
    else
        state.pageCurrent[menu] = !state.pageCurrent[menu]
  }
  
  </script>