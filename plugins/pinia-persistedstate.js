import { defineNuxtPlugin, useCookie } from '#app';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const options = {
    storage: sessionStorage,
    beforeRestore: () => {},
    afterRestore: () => {},
    serializer: {
        serialize: JSON.stringify,
        deserialize: JSON.parse,
    },
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$pinia.use(createPersistedState(useCookie, options));
});