<template>
    <div>
        <div class="flex flex-col justify-center items-center px-6 my-auto mx-auto pt:mt-0">
          <div class="pt-4 w-full max-w-lg bg-white rounded-2xl shadow-lg shadow-gray-300">
                <div class="space-y-8">
                    <div class="pl-10 pr-4 flex justify-between items-start rounded-t">
                        <h2 class="text-lg font-semibold text-gray-900 my-auto">
                        Attachments
                        </h2>
                        <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                        @click="$emit('closeAttachment')">
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
                    
                <LoadingSpinner :isActive="state.isPageLoading">
                    <div class="w-full px-2 flex flex-row-reverse border-b pb-2">
                        <label>
                            <input type="file" class="hidden" @change="fileSelected($event)"/>
                            <span class="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white rounded-lg bg-blue-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                            >
                                <Icon name="material-symbols:upload" class="-ml-1 w-5 h-5"></Icon>
                                Upload File
                            </span>
                        </label>
                    </div>
                    <div v-if="state.files && state.files.length > 0" class="grid grid-cols-4 gap-4 p-3">
                        <div v-for="(file, index) in state.files" :key="index" class="text-center">
                            <div class="flex flex-row-reverse">
                                <Menu as="div" class="relative inline-block text-left">
                                <div>
                                    <MenuButton
                                    class="inline-flex w-full justify-center gap-x-1 bg-white text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                                    > 
                                    <Icon name="ic:outline-expand-circle-down" class="w-4 h-4"></Icon>
                                    </MenuButton>
                                </div>

                                <transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                    <MenuItems
                                    class="absolute right-0 z-10 mt-1 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                    <div class="px-1 py-1">
                                        <MenuItem
                                            v-if="file.filetype == 0 || file.filetype == 1">
                                            <button
                                                @click="openFile(file)"
                                                class="group flex w-full items-center rounded-md px-1 py-1 text-sm hover:bg-gray-100">
                                                Open
                                            </button>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                @click="downloadFile(file)"
                                                class="group flex w-full items-center rounded-md px-1 py-1 text-sm hover:bg-gray-100">
                                                Download
                                            </button>
                                        </MenuItem>
                                        <!-- <MenuItem>
                                            <a :href="runtimeConfig.public.apiBaseURL + '/attachments/' + user.companyid + '/' + file.filename"
                                                download
                                                class="group flex w-full items-center rounded-md px-1 py-1 text-sm hover:bg-gray-100">Download</a>
                                        </MenuItem> -->
                                        <MenuItem>
                                            <button
                                                @click="deleteFile(file.documentid)"
                                                class="group flex w-full items-center rounded-md px-1 py-1 text-sm hover:bg-gray-100">
                                                Delete
                                            </button>
                                        </MenuItem>
                                    </div>
                                    </MenuItems>
                                </transition>
                                </Menu>
                            </div>
                            <img v-if="file.filetype === 0" :src="runtimeConfig.public.apiBaseURL + '/attachments/' + user.companyid + '/' + file.filename" class="h-16 mx-auto">
                            <img v-else-if="file.filetype === 1" src="~/assets/img/pdf_file.svg" class="w-16 h-16 mx-auto">
                            <img v-else-if="file.filetype === 2" src="~/assets/img/docx.png" class="w-16 h-16 mx-auto">
                            <img v-else src="~/assets/img/pdf_file.svg" class="w-16 h-16 mx-auto">
                            <span class="text-xs">{{ file.documentname.substring(0, 12) }}</span>
                        </div>
                    </div>
                    <div v-else class="p-3 text-center">
                        <span class="text-sm">No files found.</span>
                    </div>
                </LoadingSpinner>
            </div>
          </div>
        </div>
    </div>
  </template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useUserStore } from '@/store/user';
import { fileService } from '@/components/api/FileService';

const { $toastNotification, $downloadFile } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()

const user = useUserStore().getUser

const props = defineProps({
    typeID:{
        type: Number,
        required: true
    },
    attachableID:{
        type: Number,
        required: true
    },
    lotID:{
        type: Number,
        required: false,
        default: 0
    }
})

const emit = defineEmits(["closeAttachment"])

const state = reactive({
    files: [],
    isPageLoading: false,
    error: null
})

onMounted(() => {
    getFiles()
})

async function getFiles(){
    state.isPageLoading = true
    try{
        const response = await fileService.get(props.typeID, props.attachableID, props.lotID)
        state.files = response.data
    }
    catch(error){
        state.error = error.message
    }
    state.isPageLoading = false
}

async function fileSelected(e){
    const file = e.target.files[0]
    const maxFileSize = 50 * 1024 * 1024 // 2 MB
    if (file && file.size > maxFileSize){
        $toastNotification('error', '', 'File too large! Please limit to 50mb.')
        return
    }

    let data = new FormData()
    data.append('companyid', user.companyid)
    data.append('invoiceno', props.attachableID)
    data.append('lotid', props.lotID)
    data.append('attachedby', user.employeeid)
    data.append('typeid', props.typeID)
    data.append('formFile', file)
    state.isPageLoading = true
    try{
        const response = await fileService.upload(data)
        state.files.push(response.data)
    }
    catch(error){
        $toastNotification('error', '', error.message)
    }
    state.isPageLoading = false
    
}

function openFile(file){
    window.open(runtimeConfig.public.apiBaseURL + '/attachments/' + user.companyid + '/' + file.filename, '_blank');
}
function downloadFile(file){
    $downloadFile('wwwroot/attachments/' + user.companyid + '/' + file.filename, file.documentname)
}

async function deleteFile(id){
    state.isPageLoading = true
    try{
        const params = {
            id: id
        }
        await fileService.delete(params)
        getFiles();
    }
    catch(error){
        $toastNotification('error', '', error.message)
    }
    state.isPageLoading = false
}

</script>