<template>
  <aside
    id="sidebar"
    class="flex fixed top-0 left-0 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width" :class="!sidebarOpen && !openHoverState ? 'lg:w-16' : ' z-20 lg:w-64'"
    aria-label="Sidebar"
    @mouseenter="$emit('onSideBarEnter')"
    @mouseleave="$emit('onSideBarLeave')"
  >
    <div class="flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50 md:flex" :class="sidebarOpen ? '' : 'hidden'">
      <div class="flex overflow-y-auto flex-col flex-1 pt-4 pb-4">
        <div class="flex-1 px-3 bg-gray-50" id="sidebar-items">
          <ul class="pb-2 pt-1">
            <li>
              <form action="#" method="GET" class="lg:hidden">
                <label for="topbar-search" class="sr-only">Search</label>
                <div class="relative">
                  <div
                    class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                  >
                    <Icon name="material-symbols:search" class="w-5 h-5"></Icon>
                  </div>
                <FormTextField
                    name="topbar-search"
                    placeholder="Search"
                    class="pl-10"
                    v-model="state.searchString"
                ></FormTextField>
                </div>
              </form>
            </li>
            <li>
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/dashboard"
                  :class="route.path === '/dashboard' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200 "
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="material-symbols:home-outline-rounded" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Dashboard</span>
                </a>
              </div>
            </li>
            <li v-if="state.isSurveying">
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/surveys"
                  :class="route.path === '/surveys' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="icon-park-outline:land-surveying" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Surveys</span>
                </a>
              </div>
            </li>
            <li v-if="state.isRental">
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/rentals"
                  :class="route.path === '/rentals' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="tabler:contract" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Rental Contracts</span>
                </a>
              </div>
            </li>
            <li v-if="state.isRental">
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/properties"
                  :class="route.path === '/properties' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="material-symbols:home-work-outline-rounded" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Buildings</span>
                </a>
              </div>
            </li>
            <li v-if="state.isSurveying || state.isRental">
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/payments"
                  :class="route.path === '/payments' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="material-symbols:payments-outline" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Payments</span>
                </a>
              </div>
            </li>
            <li v-if="state.isSurveying || state.isRental">
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/creditmemo"
                  :class="route.path === '/creditmemo' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="ri:discount-percent-line" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Credit Memo</span>
                </a>
              </div>
            </li>
            <li v-if="state.isSurveying || state.isRental">
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/clients"
                  :class="route.path === '/clients' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="ph:users-three" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Clients</span>
                </a>
              </div>
            </li>
            <li>
              <div class="bg-white text-sm pl-2 pt-4">Finance</div>
            </li>
            <li>
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/expenses"
                  :class="route.path === '/expenses' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="solar:bill-check-outline" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Expenses</span>
                </a>
              </div>
            </li>
            <!-- <li>
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/accountspayable"
                  :class="route.path === '/accountspayable' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="solar:bill-broken" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Accounts Payable</span>
                </a>
              </div>
            </li> -->
            <li>
              <div class="bg-white rounded-t-lg text-dark-500">
                <a href="/pettycash"
                  :class="route.path === '/pettycash' ? activeMenu : 'hover:bg-gray-100'"
                  class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                  sidebar-toggle-collapse="">
                  <div class="bg-white shadow-md shadow-gray-300 text-dark-700 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">
                    <Icon name="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance" class="w-4 h-4 text-gray-800"></Icon>
                  </div>
                  <span class="ml-3 text-dark-500 text-sm">Petty Cash</span>
                </a>
              </div>
            </li>
            <li v-if="user.isappsysadmin">
              <LayoutSidebarToggleMenu title="Master Files" iconname="material-symbols:file-copy-outline">
                <li v-if="state.isSurveying || state.isRental">
                  <a
                    href="/masterfiles/banks"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Banks/e-Wallets</span></a
                  >
                </li>
                <li v-if="state.isSurveying || state.isRental">
                  <a
                    href="/masterfiles/bankaccounts"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Bank Accounts</span></a>
                </li>
                <li v-if="state.isSurveying || state.isRental">
                  <a
                    href="/masterfiles/creditmemotypes"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Credit Types</span></a>
                </li>
                <li>
                  <a
                    href="/masterfiles/expensetypes"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Expense Types</span></a
                  >
                </li>
                <li>
                  <a
                    href="/masterfiles/offices"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Offices</span></a
                  >
                </li>
                <li>
                  <a
                    href="/masterfiles/otherfees"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Other Fees</span></a
                  >
                </li>
                <li v-if="user.isappsysadmin">
                  <a
                    href="/users"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Users</span></a
                  >
                </li>
                <li>
                  <a
                    href="/masterfiles/vendors"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Vendors</span></a
                  >
                </li>
              </LayoutSidebarToggleMenu>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { usePrefStore } from '@/store/pref'

const userStore = useUserStore();
const user = userStore.getUser
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

const state = reactive({
  searchString: '',
  isSurveying: (user.company.planid >= 0 && user.company.planid <= 3),
  isRental: (user.company.planid >= 6 && user.company.planid <= 9)
})

watch(() => state.searchString, (data)=>{
  prefStore.setSearchString(data)
})
</script>