import { defineNuxtPlugin } from '#app';
import { notify } from '@kyvg/vue3-notification';

export default defineNuxtPlugin(() => {
    const toastNotification = (type, title, msg) =>{
        notify({
            title: title,
            text: msg,
            type: type,
        })
    }
    return {
      provide: {
        toastNotification: toastNotification
      }
    }
  })