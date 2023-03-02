<template>
    <div class="relative w-full p-2 mt-2 border rounded">
        <p class="mt-2 font-semibold text-xs"> {{ orderdetail.itemdescription }}</p>
        <p class="mt-2 text-xs">Qty: {{ orderdetail.qty }}</p>
        <button class="block w-full inline-flex justify-center mt-2 p-1 text-xs border rounded text-blue-400 cursor-not-allowed" disabled v-if="isBusy">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
        </button>
        <button @click="onUpdateStatus" class="block w-full text-xs bg-blue-500 text-white rounded mt-2 p-1" v-else-if="orderdetail.status === 1">Prepare Now</button>
        <button @click="onUpdateStatus" class="block w-full text-xs bg-cyan-600 text-white rounded mt-2 p-1" v-else-if="orderdetail.status === 2">Mark as Ready</button>
        <button @click="onUpdateStatus" class="block w-full text-xs bg-green-600 text-white rounded mt-2 p-1" v-else-if="orderdetail.status === 3">Mark as Served</button>

        <span v-if="orderdetail.status === 0" class="absolute right-0 top-0 mt-1 mr-1 text-xs bg-red-400 text-white p-1 rounded leading-none">Cancelled</span>
        <span v-if="orderdetail.status === 2" class="absolute right-0 top-0 mt-1 mr-1 text-xs bg-cyan-600 text-white p-1 rounded leading-none">Preparing</span>
        <span v-if="orderdetail.status === 3" class="absolute right-0 top-0 mt-1 mr-1 text-xs bg-green-600 text-white p-1 rounded leading-none">Ready</span>
        <span v-if="orderdetail.status === 4" class="absolute right-0 top-0 mt-1 mr-1 text-xs bg-green-600 text-white p-1 rounded leading-none">Served</span>
        <span v-if="orderdetail.status === 1" class="absolute right-0 top-0 mt-1 mr-1 text-xs bg-blue-500 text-white p-1 rounded leading-none">Pending</span>
    </div>
</template>

<script>
import { ref } from 'vue'
import { foodstatus } from '@/contants/consts'
import { orderService } from './api/OrderService'

export default {
    props: ['orderdetail'],
    setup(props){
        const isBusy = ref(false)
        async function onUpdateStatus(){
            let newstatus = foodstatus.pending
            if(props.orderdetail.status == foodstatus.pending)
                newstatus = foodstatus.preparing
            else if(props.orderdetail.status == foodstatus.preparing)
                newstatus = foodstatus.ready
            else if(props.orderdetail.status == foodstatus.ready)
                newstatus = foodstatus.served
            let data = { ...props.orderdetail }
            data.status = newstatus;
            
            isBusy.value = true
            await orderService.updateOrderStatus(data).then((response) => {
                if(response === true){
                    isBusy.value = false
                    props.orderdetail.status = newstatus
                }
            }).catch((error) => {
                isBusy.value = false
            })
        }
        return {isBusy, onUpdateStatus}
    }
}
</script>

<style>

</style>