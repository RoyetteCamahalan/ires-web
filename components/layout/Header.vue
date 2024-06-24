<template>
  <div>
    <nav class="fixed z-30 w-full bg-gray-50">
      <div class="py-3 px-3 lg:px-5 lg:pl-3">
        <div class="flex justify-between items-center">
          <div class="flex justify-start items-center">
            <button
              id="toggleSidebar"
              aria-expanded="true"
              aria-controls="sidebar"
              class="hidden p-2 mr-4 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100"
              @click="$emit('toggleSidebar', false)"
            >
              <Icon name="material-symbols:menu" class="w-6 h-6"></Icon>
            </button>
            <button v-if="sidebarOpen"
              id="toggleSidebarMobileSearch"
              type="button"
              class="p-2 text-gray-500 rounded-2xl lg:hidden hover:text-gray-900 hover:bg-gray-100"
              @click="$emit('toggleSidebar', false)"
            >
              <Icon name="material-symbols:close" class="w-6 h-6"></Icon>
            </button>
            <button v-else
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              class="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 sm:hidden"
              @click="$emit('toggleSidebar', false)"
            >
              <Icon name="material-symbols:menu" class="w-6 h-6"></Icon>
            </button>
            <a href="/" class="text-md font-semibold flex items-center lg:mr-1.5">
              <!-- <img
                src="https://i.imgur.com/hamRKWZ.jpeg"
                class="mr-2 h-7"
                alt="Creative Tim Logo"
              /> -->
              <span
                class="hidden md:inline-block self-center text-lg font-bold whitespace-nowrap"
                >HexaByt</span
              >
            </a>
            <form action="#" method="GET" class="hidden lg:block lg:pl-8">
              <label for="topbar-search" class="sr-only">Search</label>
              <div class="relative mt-1 lg:w-80">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <Icon
                    name="material-symbols:search"
                    class="text-gray-400"
                  ></Icon>
                </div>
                <FormTextField
                  name="topbar-search"
                  placeholder="Search"
                  class="pl-10"
                  v-model="state.searchString"
                ></FormTextField>
              </div>
            </form>
            <h1 class="ml-2 text-lg font-bold text-blue-600">{{ props.title }}</h1>
          </div>
          <div class="flex items-center">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              class="p-2 text-gray-500 rounded-2xl lg:hidden hover:text-gray-900 hover:bg-gray-100"
              @click="$emit('toggleSidebar', true)"
            >
              <span class="sr-only">Search</span>
              <Icon name="material-symbols:search" class="w-6 h-6"></Icon>
            </button>
            <button
                  type="button"
                  class="mx-1 p-2 flex text-sm"
                  id="user-menu-button-2"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-2"
                  @click="navigateTo('/calendar')"
                >
                  <Icon name="material-symbols:calendar-today" class="w-6 h-6 text-blue-600"></Icon>
                </button>
            <div class="relative mx-1">
              <button
                type="button"
                data-dropdown-toggle="notification-dropdown"
                class="relative text-gray-500 rounded-2xl hover:text-gray-900 hover:bg-gray-100"
                @click="openNotifications"
              >
                <span class="sr-only">View notifications</span>
                <Icon name="material-symbols:notifications" class="w-6 h-6 text-blue-600"></Icon>
                <span v-if="state.notifications && state.notifications.length > 0" aria-hidden="true" class="absolute top-0 right-0 w-4 h-4 text-xs font-semibold inline-block transform translate-x-1 -translate-y-1 bg-red-600 text-white rounded-full">
                  {{ state.notifications ? state.notifications.length : '' }}
                </span>
              </button>
              <div
                v-if="state.isOpenNotification"
                v-click-outside="closeNotifications"
                class="absolute overflow-hidden z-50 my-4 right-0 border border-blue-200 -translate-x-2 w-64 text-base list-none bg-white rounded-lg divide-y divide-gray-100 shadow-lg shadow-gray-300"
                id="notification-dropdown"
                data-popper-placement="bottom"
              >
                <div
                  class="block py-2 px-4 text-base font-medium text-center text-white bg-blue-600"
                >
                  Notifications
                </div>
                <div v-if="state.notifications.length === 0">
                  <div class="py-2 text-xs italic text-gray-500 text-center">Your notification is empty!</div>
                </div>
                <div v-for="(notification, index) in state.notifications" :key="index">
                  <a :href="notification.url + `?notif_id=${notification.id}`" class="flex py-3 px-4 hover:bg-gray-100">
                    <div class="flex-shrink-0">
                      <Icon :name="notification.typeid === 0 ? 'icon-park-outline:bill' : 'material-symbols:info-outline' " class="w-10 h-10 p-2 bg-gray-50 rounded-full"></Icon>
                    </div>
                    <div class="pl-3 w-full">
                      <div class="text-gray-600 font-normal text-sm mb-1.5">
                        {{ notification.details }}
                      </div>
                      <div class="text-xs font-medium text-blue-500">
                        {{ $dateInterVal(moment(notification.datecreated), null) }}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="ml-3">
              <div class="relative">
                <button
                  type="button"
                  class="flex text-sm bg-blue-800 rounded-full focus:ring-4 focus:ring-gray-300"
                  id="user-menu-button-2"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-2"
                  @click="openProfile"
                >
                  <span class="sr-only">Open user menu</span>
                  <div
                    class="flex flex-col justify-center w-8 h-8 rounded-full text-white">
                    <span class="text-lg font-semibold relative items-center">{{ user.firstname[0] }}</span>
                  </div>
                </button>
              </div>

                <ul v-click-outside="closeProfileMenu" v-if="state.isOpenProfile"
                  class="profile-menu-items origin-top-right absolute right-0 mt-2 mr-4 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <li>
                    <a
                      href="/billing"
                      class="flex items-center gap-x-3 px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Billing
                    </a>
                  </li>
                  <li>
                    <a
                      class="flex items-center gap-x-3 px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                      @click="state.modalIsShowChangeProfile = true"
                    >
                      <Icon name="material-symbols:lock-outline-sharp" class="w-5 h-5"></Icon>
                      Change Password
                    </a>
                  </li>
                  <li>
                    <button type="button"
                      class="flex items-center gap-x-3 px-4 py-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                      @click="logOut"
                    >
                      <Icon
                        name="material-symbols:login-sharp"
                        class="w-5 h-5"
                      ></Icon>
                      Logout
                    </button>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <ModalEmpty title="" :isShow="state.modalIsShowChangeProfile">
        <UiUserChangepassword @on-close="onCloseChangePass"></UiUserChangepassword>
    </ModalEmpty>
  </div>
</template>

<script setup>
import { dashboardService } from '@/components/api/Dashboard';
import { useUserStore } from '@/store/user'
import { usePrefStore } from '@/store/pref'
import moment from 'moment';

const route = useRoute()
const userStore = useUserStore()
const user = userStore.getUser
const prefStore = usePrefStore()

const notif_id = route.query.notif_id ? route.query.notif_id : null

const props = defineProps({
  sidebarOpen:{
    type: Boolean,
    required: true,
  },
  title:{
    type: String,
    required: false,
    default: ''
  }
})

const state = reactive({
  isOpenProfile: false,
  isOpenNotification: false,
  searchString: '',
  modalIsShowChangeProfile: false,
  notifications: []
})

const emit = defineEmits(['toggleSidebar'])

onMounted(() => {
  fetchNotifications()
  if(notif_id)
    viewNotification(notif_id)
})

const openProfile = () =>{
  state.isOpenProfile = !state.isOpenProfile
  state.isOpenNotification = false
}
const closeProfileMenu = () =>{
  state.isOpenProfile = false
}

const openNotifications = () =>{
  console.log(state.isOpenNotification)
  state.isOpenNotification = !state.isOpenNotification
  console.log(state.isOpenNotification)
  state.isOpenProfile = false
}
const closeNotifications = () =>{
  console.log('fired')
  state.isOpenNotification = false
}

const logOut = () =>{
  userStore.resetUser()
  navigateTo('/login')
}

watch(() => state.searchString, (data)=>{
  prefStore.setSearchString(data)
})

function onCloseChangePass(){
  state.modalIsShowChangeProfile= false
}

async function fetchNotifications(){
  try{
    const response = await dashboardService.getNotifications()
    state.notifications = response.data
  }
  catch(error){

  }
}

function viewNotification(id){
  try{
    const param = {
      id: id
    }
    dashboardService.markAsRadNotif(param)
    fetchNotifications()
  }
  catch(error){

  }
}
</script>