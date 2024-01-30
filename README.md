
# Simple Feedback Form 

Simple contact form for Vue 3 (name, email, message) + vue-i18n (ru, en, kr)


## Installation

Install @ubrand/feedback-form-vue3 with npm

```bash
  npm install @ubrand/feedback-form-vue3
```
or using yarn
```bash
 yarn add @ubrand/feedback-form-vue3
```

Install UIkit package optionally with npm
```bash
npm install uikit || yarn add uikit
````
### Module
`./main.js`:
```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { VueReCaptcha } from '@ubrand/feedback-form-vue3'
import { messages } from '@ubrand/feedback-form-vue3/dist/locales/index.js'

import '@ubrand/feedback-form-vue3/dist/css/style.css';
import 'uikit'
import 'uikit/dist/css/uikit.min.css'

//ru, en, kr
localStorage.setItem('locale', 'ru');

const i18n = createI18n({
    locale: localStorage.getItem('locale') || 'ru',
    fallbackLocale: 'en',
    legacy: false,
    messages
})

createApp(App)
    .use(i18n)
    .use(VueReCaptcha, { siteKey: '<site key>' })
    .mount('#app');
```
## Using
Once installed, it can be used in a template as simply as:
```html
<script setup>
    import { FeedbackForm } from '@ubrand/feedback-form-vue3';
</script>

<feedback-form 
    :postRequest="postRequest"
    :showErrorDetail="showErrorDetail"
    :rowsTextarea="rowsTextarea"
/>
```
