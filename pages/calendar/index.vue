<template>
    <div>
        <NuxtLayout name="admin" title="My Calendar">
            <div class="m-2">
                <div class="w-full mt-5 rounded-lg border border-gray-300 bg-white">
                    <div class="w-full px-4 py-3 flex justify-between bg-blue-50 rounded-t-lg">
                        <h1 class="font-semibold">{{ state.monthName + ' ' + state.year }}</h1>
                        <div class="flex">
                            <MenuPopOver :label="state.monthName" position="right-0">
                                <button v-for="(data, index) in state.months" :key="index"
                                    @click="selectMonth(data)"
                                    type="button"
                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">{{ data.label }}
                                </button>
                            </MenuPopOver>
                            <MenuPopOver :label="state.year" class="ml-2" position="right-0">
                                <button v-for="(data, index) in state.years" :key="index"
                                    @click="selectYear(data)"
                                    type="button"
                                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100">{{ data }}
                                </button>
                            </MenuPopOver>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="grid grid-cols-7 bg-gray-200 gap-px border-b">
                            <div class="col-span-1 px-4 py-2 bg-white text-center text-sm font-semibold">
                                S<span class="hidden sm:inline-block">un</span>
                            </div>
                            <div class="col-span-1 px-4 py-2 bg-white text-center text-sm font-semibold">
                                M<span class="hidden sm:inline-block">on</span>
                            </div>
                            <div class="col-span-1 px-4 py-2 bg-white text-center text-sm font-semibold">
                                T<span class="hidden sm:inline-block">ue</span>
                            </div>
                            <div class="col-span-1 px-4 py-2 bg-white text-center text-sm font-semibold">
                                W<span class="hidden sm:inline-block">ed</span>
                            </div>
                            <div class="col-span-1 px-4 py-2 bg-white text-center text-sm font-semibold">
                                T<span class="hidden sm:inline-block">hu</span>
                            </div>
                            <div class="col-span-1 px-4 py-2 bg-white text-center text-sm font-semibold">
                                F<span class="hidden sm:inline-block">ri</span>
                            </div>
                            <div class="col-span-1 px-4 py-2 bg-white text-center text-sm font-semibold">
                                S<span class="hidden sm:inline-block">at</span>
                            </div>
                        </div>
                        <LoadingSpinner :is-active="state.isPageLoading">
                            <div :class="[ 'grid grid-cols-7 bg-gray-200 gap-px text-sm', state.calendarDays.length > 35 ? 'grid-rows-6' : 'grid-rows-5' ]">
                                <button v-for="(data, index) in state.calendarDays" :key="index" :class="[ 'relative px-3 py-2', data.isactive ? 'bg-white' : 'bg-gray-50']"
                                    @click="selectDay(data)">
                                    <div class="flex mb-2">
                                        <div :class=" ['flex justify-center w-6 h-6 ml-auto sm:ml-0', data.events.length == 0 ? 'text-gray-500' : 'font-semibold text-white bg-blue-500 rounded-full items-center' ]">
                                            {{ data.date.getDate()}}
                                        </div>
                                    </div>
                                    <div v-if="data.events.length == 0" class="h-8 hidden sm:inline-block"></div>
                                    <div v-for="(event, index) in data.events" :key="index" class="w-full hidden sm:inline-block">
                                        <p v-if="index < 3" class="text-blue-700 text-xs font-semibold text-left truncate">{{ event.title }}</p>
                                        <p v-if="index === 3" class="text-blue-700 text-xs font-semibold text-left truncate">{{ '+' + (data.events.length - 3)  }}</p>
                                    </div>
                                    <span class="flex sm:hidden">
                                        <span v-for="(event, index) in data.events" :key="index" class="flex">
                                            <span v-if="index < 3" class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-0.5"></span>
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </LoadingSpinner>
                    </div>
                </div>
                <div id="dailyevents" class="w-full mt-5 rounded-lg border border-gray-300 bg-white">
                    <div>
                        <div class="w-full px-4 py-2 flex justify-between bg-blue-50 rounded-t-lg">
                            <h1 class="font-semibold">Events - {{ state.selectedDay ? moment(state.selectedDay.date).format('MMMM DD, YYYY') : 'No date selected' }}</h1>
                        </div>
                        <div class="w-full">
                            <div v-if="state.selectedDay && state.selectedDay.events.length > 0" class="m-2 md:m-4">
                                <div v-for="(data, index) in state.selectedDay.events" :key="index" class="flex border-b p-2 md:m-4">
                                    <div
                                        class="flex flex-col justify-center w-8 h-8 mr-3 rounded-full text-white bg-blue-500 hidden md:flex items-center">
                                        <Icon name="icon-park-outline:land-surveying"></Icon>
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="text-blue-600 text-sm font-semibold">{{ data.title }}</span>
                                        <div class="flex text-sm">
                                            <span>Remarks:</span>
                                            <p v-if="data.moduleid === appModules.survey" class="ml-2 italic">test</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="py-4 text-sm italic text-center">No events found!</div>
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
<script setup>
import { dashboardService } from '@/components/api/Dashboard';
import { appModules } from '@/contants/consts';
import moment from 'moment'

const currentDate = new Date()
const state = reactive({
    year: currentDate.getFullYear(),
    month: 5,
    monthName: '',
    years: [],
    months: [
        { value: 1, label: 'January'},
        { value: 2, label: 'February'},
        { value: 3, label: 'March'},
        { value: 4, label: 'April'},
        { value: 5, label: 'May'},
        { value: 6, label: 'June'},
        { value: 7, label: 'July'},
        { value: 8, label: 'August'},
        { value: 9, label: 'September'},
        { value: 10, label: 'October'},
        { value: 11, label: 'November'},
        { value: 12, label: 'December'},
    ],
    calendarDays: [],
    events: [],
    selectedDay: null,
    isPageLoading: false,
})

onMounted(() => {
    state.years.push( currentDate.getFullYear() - 1)
    state.years.push( currentDate.getFullYear())
    state.years.push( currentDate.getFullYear() + 1)
    selectMonth(state.months[currentDate.getMonth()], false)
    selectYear(currentDate.getFullYear(), false)
    generateCalendar()
})

async function fetchEvents(){
    state.isPageLoading = true
    try{
        const sdate = moment(state.calendarDays[0].date).format('YYYY-MM-DD')
        const edate = moment(state.calendarDays[state.calendarDays.length - 1].date).format('YYYY-MM-DD')
        const response = await dashboardService.getCalendarEvents(sdate, edate)
        state.events = response.data
        for(var i = 0; i < state.calendarDays.length; i++ ){
            for(var j = 0; j < state.events.length; j++ ){
                const e = state.events[j]
                if((new Date(e.date)).getTime() === state.calendarDays[i].date.getTime())
                    state.calendarDays[i].events.push(e)
            }
        }
    }catch(error){
        console.log(error)
    }
    state.isPageLoading = false
}
function generateCalendar(){
    state.selectedDay = null
    let sdate = new Date(`${state.year}-${state.month}-01`)
    if(sdate.getDay() > 0)
        sdate.setDate(sdate.getDate() - sdate.getDay())
    
    state.calendarDays = []
    while(sdate.getMonth() < state.month){
        var event = { date: new Date(sdate), isactive: sdate.getMonth() === state.month-1, events: []}
        state.calendarDays.push(event)
        sdate.setDate(sdate.getDate() + 1)
    }
    while(sdate.getDay() != 0){
        state.calendarDays.push({ date: new Date(sdate), isactive: false, events: []})
        sdate.setDate(sdate.getDate() + 1)
    }
    fetchEvents()
}

function selectMonth(data, generate = true){
    state.month = data.value
    state.monthName = data.label
    if(generate)
        generateCalendar()
}

function selectYear(value, generate = true){
    state.year = value
    if(generate)
        generateCalendar()
}

function selectDay(data){
    state.selectedDay = data
    let element = document.getElementById('dailyevents')
    element.scrollIntoView(true)
}


</script>