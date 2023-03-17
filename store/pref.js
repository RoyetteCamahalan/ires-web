import { defineStore } from "pinia";

export const usePrefStore = defineStore('prefStore',
{
    persist: true,
    state: () =>({
        sidebarOpen: true,
        searchString: '',
    }),
    actions:{
        setSideBarStatus(value){
            this.sidebarOpen = value
        },
        setSearchString(value){
            this.searchString = value
        },
        resetSearchString(){
            this.searchString = ''
        }
    },
    getters:{
        getSideBarStatus: (state) => state.sidebarOpen,
        getSearchString: (state) => state.searchString,
    }
})