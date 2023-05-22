
<template>
  <div class="w-full text-gray-700 bg-blue-100">
    <div
      class="flex flex-col max-w-screen-xl px-8 mx-auto md:items-center md:justify-between md:flex-row"
    >
      <div class="flex flex-row items-center justify-between py-6">
        <div class="relative md:mt-8">
          <a
            href="/"
            class="ml-6 text-lg relative z-50 font-bold tracking-widest text-gray-900 rounded-lg focus:outline-none focus:shadow-outline"
            >HexaByt
          </a>
          <img src="/img/logo.png" class="h-8 z-40 absolute top-0 -left-3"/>
        </div>
        <button
          @click="state.isToggleMenu = !state.isToggleMenu"
          class="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
        >
          <svg v-if="state.isToggleMenu" fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            <path
              fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
            ></path>
            <!---->
          </svg>
          <svg v-else fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            <path fill-rule="evenodd" 
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
            <!---->
          </svg>
        </button>
      </div>
      <nav
        :class="['h-0 md:h-auto flex flex-col flex-grow md:items-center pb-4 md:pb-0 md:flex md:justify-end md:flex-row origin-top duration-300',
                state.isToggleMenu ? 'h-full' : 'scale-y-0 transform md:transform-none']"
      >
        <a
          href="#cloudapps"
          class="px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-8 md:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline"
          >Apps
        </a>
        <a
          href="#pricing"
          class="px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-8 md:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline"
          >Pricing
        </a>
        <a
          href="#contactus"
          class="px-4 py-2 mt-2 text-sm font-medium bg-transparent rounded-lg md:mt-8 md:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline"
          >Contact Us
        </a>
        <a
          href="/login"
          class="px-10 py-2 mt-2 text-sm text-center bg-white text-gray-800 rounded-full md:mt-8 md:ml-4"
          >Login
        </a>
        <a
          href="/company/register"
          class="px-10 py-2 mt-2 text-sm text-center bg-blue-600 text-white rounded-full md:mt-8 md:ml-4"
          >Try Now
        </a>
      </nav>
    </div>
  </div>
</template>
<script setup>

const state = reactive({
  isToggleMenu: false
})
</script>