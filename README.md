
# Simple modal form

Simple modal window based on Vue 3 and Vuex 4 for adding custom content


## Installation

Install vue3-simple-modal-form with npm

```bash
  npm install vue3-simple-modal-form
```
or using yarn
```bash
 yarn add vue3-simple-modal-form
```
    
### Browser
Include the script file, e.g.:
### Module
```js
import { SimpleModal } from 'vue3-simple-modal-form';
import 'vue3-simple-modal-form/dist/style.css';
import { useStore } from 'vuex'

const store = useStore();
```
## Settings
Import modal form states:
```js
import { createStore } from 'vuex';
import SimpleModalStore from 'vue3-simple-modal-form/dist/storage';

const store = createStore({
    modules: {
        ...
        modal: SimpleModalStore
    }
});
```
## Using
Once installed, it can be used in a template as simply as:
```vue
<SimpleModal>
    <div class="my-class">
        Hellow, world!
    </div>
</SimpleModal>
```
```vue
<button @click="store.commit('modal/CALL_MODAL', true)">
    Open modal window
</button>
```