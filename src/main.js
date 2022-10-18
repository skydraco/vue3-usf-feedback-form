import { createApp } from 'vue';
import { createI18n } from 'vue-i18n'
import { messages } from "./locales/index.js"

import App from './App.vue';
import 'uikit';
import 'uikit/dist/css/uikit.min.css'

import { VueReCaptcha } from './components/';

//ru, en, kr
localStorage.setItem('locale', 'ru');

const i18n = createI18n({
    locale: localStorage.getItem('locale') || 'ru',
    fallbackLocale: 'en',
    legacy: false,
    messages
})

createApp(App).use(i18n).use(VueReCaptcha, { siteKey: '<site key>' }).mount('#app');