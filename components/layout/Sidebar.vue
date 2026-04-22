<script setup lang="ts">
import { reactive, watch } from "vue";
import { useRoute } from "#imports";
import { useUserStore } from "@/store/user";
import { usePrefStore } from "@/store/pref";

defineOptions({
  name: "LayoutSidebar",
});

const userStore = useUserStore();
const user = userStore.getUser as any;
const prefStore = usePrefStore();

const route = useRoute();

const activeMenu = "bg-blue-500 text-white";

defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true,
  },
  openHoverState: {
    type: Boolean,
    required: true,
  },
});

const state = reactive({
  searchString: "",
  isSurveying:
    (user.company.planid >= 0 && user.company.planid <= 3) ||
    user.company.planid == 9,
  isRental:
    (user.company.planid >= 6 && user.company.planid <= 9) ||
    user.company.planid == 9,
});

const menuGroups: any = [
  {
    group: "Main",
    items: [
      {
        name: "Dashboard",
        icon: "material-symbols:home-outline-rounded",
        link: "/dashboard",
      },
      {
        name: "Surveys",
        icon: "icon-park-outline:land-surveying",
        link: "/surveys",
        isVisible: state.isSurveying,
      },
      {
        name: "Rental Contracts",
        icon: "tabler:contract",
        link: "/rentals",
        isVisible: state.isRental,
      },
      {
        name: "Buildings",
        icon: "material-symbols:home-work-outline-rounded",
        link: "/properties",
        isVisible: state.isRental,
      },
      {
        name: "Payments",
        icon: "material-symbols:payments-outline",
        link: "/payments",
        isVisible: state.isSurveying || state.isRental,
      },
      {
        name: "Credit Memo",
        icon: "ri:discount-percent-line",
        link: "/creditmemo",
        isVisible: state.isSurveying || state.isRental,
      },
      {
        name: "Clients",
        icon: "ph:users-three",
        link: "/clients",
        isVisible: state.isSurveying || state.isRental,
      },
    ],
  },
  {
    group: "Finance",
    items: [
      { name: "Expenses", icon: "solar:bill-check-outline", link: "/expenses" },
      {
        name: "Billing Accounts",
        icon: "material-symbols:account-balance-wallet-outline-rounded",
        link: "/billing-accounts",
        isNew: true,
      },
      {
        name: "Petty Cash",
        icon: "streamline:money-cash-bag-dollar-bag-payment-cash-money-finance",
        link: "/pettycash",
        isVisible: user && (user.companyid !== 15 || user.isappsysadmin),
      },
    ],
  },
];

watch(
  () => state.searchString,
  (data) => {
    prefStore.setSearchString(data);
  },
);
</script>

<template>
  <aside
    id="sidebar"
    class="flex fixed top-0 left-0 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width"
    :class="!sidebarOpen && !openHoverState ? 'lg:w-16' : ' z-20 lg:w-64'"
    aria-label="Sidebar"
    @mouseenter="$emit('onSideBarEnter')"
    @mouseleave="$emit('onSideBarLeave')"
  >
    <div
      class="flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50 md:flex"
      :class="sidebarOpen ? '' : 'hidden'"
    >
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
            <template v-for="(menuGroup, index) in menuGroups" :key="index">
              <li v-if="menuGroup.group" class="mt-2">
                <div class="bg-white text-sm pl-2 pt-4">
                  {{ menuGroup.group }}
                </div>
              </li>
              <template v-for="(menuItem, idx) in menuGroup.items" :key="idx">
                <li
                  v-if="menuItem.isVisible === undefined || menuItem.isVisible"
                >
                  <div class="bg-white rounded-t-lg text-dark-500">
                    <NuxtLink
                      :to="menuItem.link"
                      :class="
                        route.path === menuItem.link
                          ? activeMenu
                          : 'hover:bg-gray-100'
                      "
                      class="flex items-center py-2.5 px-4 text-base font-normal rounded-lg group transition-all duration-200"
                      sidebar-toggle-collapse=""
                    >
                      <div
                        class="bg-white shadow-md shadow-gray-300 w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center"
                      >
                        <Icon
                          :name="menuItem.icon"
                          class="w-4 h-4 text-gray-800"
                        ></Icon>
                      </div>
                      <span class="ml-3 text-dark-500 text-sm">{{
                        menuItem.name
                      }}</span>
                      <Badge
                        v-if="menuItem.isNew"
                        value="Beta"
                        class="ml-auto bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full"
                      ></Badge>
                    </NuxtLink>
                  </div>
                </li>
              </template>
            </template>
            <li v-if="user.isappsysadmin">
              <LayoutSidebarToggleMenu
                title="Master Files"
                iconname="material-symbols:file-copy-outline"
              >
                <li v-if="state.isSurveying || state.isRental">
                  <NuxtLink
                    to="/masterfiles/banks"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Banks/e-Wallets</span>
                  </NuxtLink>
                </li>
                <li v-if="state.isSurveying || state.isRental">
                  <NuxtLink
                    to="/masterfiles/bankaccounts"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Bank Accounts</span></NuxtLink
                  >
                </li>
                <li v-if="state.isSurveying || state.isRental">
                  <NuxtLink
                    to="/masterfiles/creditmemotypes"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Credit Types</span></NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/masterfiles/expensetypes"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Expense Types</span></NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/masterfiles/offices"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Offices</span></NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/masterfiles/otherfees"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Other Fees</span></NuxtLink
                  >
                </li>
                <li v-if="user.isappsysadmin">
                  <NuxtLink
                    to="/users"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Users</span></NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/masterfiles/vendors"
                    class="text-sm text-dark-500 rounded-lg flex items-center p-2 group hover:bg-gray-200 transition duration-75 pl-11"
                    ><span>Vendors</span></NuxtLink
                  >
                </li>
              </LayoutSidebarToggleMenu>
            </li>
            <li>
              <NuxtLink
                to="/faqs"
                target="_blank"
                class="block w-full mt-2 px-2 py-1 text-center bg-blue-50 text-blue-500 text-sm font-semibold rounded-full border border-blue-500"
              >
                Documentation
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>
