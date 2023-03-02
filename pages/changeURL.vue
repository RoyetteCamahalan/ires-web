<template>
    <div>
      <div class="flex items-center min-h-screen p-6 bg-gray-50">
        <div class="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
            <div class="flex flex-col overflow-y-auto">
              <div class="flex items-center justify-center p-6">
                <div class="w-full">
                  <h1 class="mb-4 text-gray-500 text-center">
                    Configuring your URL
                  </h1>
                  <div class="flex items-center justify-center">
                    <img src="/img/loading.svg" alt="Loading..."/>
                  </div>
                  <!-- You should use a button here, as the anchor is only used for the example  -->
                  <button class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded hover:bg-blue-700"
                    @click="returnDashboard">
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      setup(){
        const returnDashboard = () =>{
          navigateTo('/')
        }
  
        return {
          returnDashboard
        }
      }
  }
  </script>