<template>
    
  <div>
    <div class="flex flex-col flex-1">
        <Header></Header>
        <section class="block bg-white dark:bg-gray-900 mt-2">
            <!-- <LoadingSpinner :is-active="state.isFetching"> -->
                <div v-if="state.fetchError" class="w-full block flex items-center justify-center">
                    <span class="text-xs">{{ state.fetchError }}</span>
                </div>
                <div v-else class="flex max-w-max px-2">
                    <div v-for="order in state.orders" :key="order.chargeid">
                        <OrderList :order="order"></OrderList>
                    </div>
                </div>
            <!-- </LoadingSpinner> -->
        </section>
        <div v-if="state.isModalOpen" class="fixed inset-x-0 h-full flex items-start bg-black bg-opacity-50 sm:items-center sm:justify-center">
      <!-- Modal -->
      <div v-click-outside="closeModal" @keydown.escape="closeModal" class="w-full mx-2 px-6 py-4 overflow-hidden bg-white rounded-b-lg sm:rounded-lg sm:m-4 sm:max-w-xl" role="dialog" id="modal">
        <!-- Remove header if you don't want a close icon. Use modal body to place modal tile. -->
        <header class="flex justify-end">
          <button class="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700" aria-label="close" @click="closeModal">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" role="img" aria-hidden="true">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
          </button>
        </header>
        <!-- Modal body -->
        <div class="mt-4 mb-4">
          <!-- Modal title -->
          <!-- <p class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Modal header
          </p> -->
          <!-- Modal description -->
          <p class="text-sm ext-gray-700">
            Welcome to {{ state.officedescription }} Kitchen Dashboard!
          </p>
        </div>
        <footer class="flex flex-col items-center justify-end px-6 pb-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50">
          <button class="w-full px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded sm:w-auto sm:px-4 sm:py-2 hover:bg-blue-700"
            @click="closeModal">
            Start
          </button>
        </footer>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { orderService } from '@/components/api/OrderService';
import { useUserStore } from '@/store/user'
import { useSound } from '@vueuse/sound'
import positiveNotif from '../assets/sounds/PositiveNotification.wav'

definePageMeta({
    middleware: ["authenticated"]
})
    export default{
        setup(){
            const state = reactive({
                orders: null,
                isFetching: false,
                fetchError: '',
                isModalOpen: true,
                officedescription: 'Hidden Gardens'
            })
            const user = useUserStore().getUser
            if(user)
                state.officedescription = user.description
                

            const notif = useSound(positiveNotif, { interrupt: true})
            
            async function loadOrders() {
                state.isFetching = true;
                await orderService.getOpenOrders().then((response) => {
                        compareOrders(response)
                        state.isFetching = false
                        state.fetchError = ''
                    }).catch((error) => {
                        state.isFetching = false
                        state.fetchError = 'Failed to connect to server!'
                })
            }
            const compareOrders = (newOrders) =>{
                if(state.orders !== null)
                {
                    let notify = false
                    newOrders.forEach(newOrder => {
                        let isExists = false
                        state.orders.forEach(order => {
                            if(order.chargeid === newOrder.chargeid){
                                isExists = true
                                if(newOrder.orderdetails.length != order.orderdetails.length)
                                    notify = true
                            }
                        });
                        if(!isExists)
                            notify = true
                    });
                    if(notify){
                        notif.play()
                    }
                }
                state.orders = newOrders
            }
            const closeModal = () =>{
                state.isModalOpen = false
                loadOrders();
                setInterval(function(){ 
                    loadOrders();
                }, 30000); 
            }
            return { state, closeModal}
        }
    }
</script>