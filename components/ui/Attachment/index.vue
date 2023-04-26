<template>
    <div>
        <div class="flex flex-col justify-center items-center px-6 mx-auto pt:mt-0">
          <div class="pt-4 w-full max-w-lg bg-white rounded-2xl shadow-lg shadow-gray-300">
            <LoadingSpinner :is-active="state.isPageLoading">
                <div class="space-y-8">
                    <div class="pl-10 pr-4 flex justify-between items-start rounded-t">
                        <h2 class="text-lg font-semibold text-gray-900 my-auto">
                        Attachments
                        </h2>
                        <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                        >
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
            </LoadingSpinner>
          </div>
        </div>
    </div>
  </template>

<script setup>


const state = reactive({
    isPageLoading: false
})
</script>