
# USF Simple Feedback Form 

Simple contact form for Vue 3 (name, email, message) + vue-i18n (ru, en, kr)


## Installation

Install vue3-usf-feedback-form with npm

```bash
  npm install vue3-usf-feedback-form
```
or using yarn
```bash
 yarn add vue3-usf-feedback-form
```

optional: install uikit with npm
```bash
yarn add uikit
````
### Module
`./main.js`:
```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { VueReCaptcha } from 'vue3-usf-feedback-form'
import { messages } from 'vue3-usf-feedback-form/dist/locales/index.js'

import 'vue3-usf-feedback-form/dist/css/style.css';
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
    import { FeedbackForm } from 'vue3-usf-feedback-form';
</script>

<feedback-form 
    :postRequest="postRequest"
    :showErrorDetail="showErrorDetail"
    :rowsTextarea="rowsTextarea"
/>
```
