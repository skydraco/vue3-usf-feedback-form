<template>
    <div class="feedback-form">
        <div class="feedback-form__header">
            {{ $t('feedbackSubject') }}
        </div>
        <div class="feedback-form__fields">
            <div class="field" :class="{ error : inputs.name }">
               <input
                  id="name"
                  class="uk-input"
                  type="text"
                  name="name"
                  v-model="model.name"
                  @focus="checkInputValue"
                  @blur="checkInputValue"
               />
               <label for="name" class="placeholder" :ref="(el) => { refs['name'] = el }">
                     {{ $t('feedbackName') }}
               </label>
                <div class="field__error" v-if="inputs.name && props.showErrorDetail">
                    {{ inputs.name }}
                </div>
            </div>
            <div class="field" :class="{ error : inputs.email }">
               <input
                  id="email"
                  class="uk-input"
                  type="email"
                  name="email"
                  v-model="model.email"
                  @focus="checkInputValue"
                  @blur="checkInputValue"
               />
               <label for="email" class="placeholder" :ref="(el) => { refs['email'] = el }">
                  {{ $t('feedbackEmail') }}
               </label>
               <div class="field__error" v-if="inputs.email && props.showErrorDetail">
                  {{ inputs.email }}
               </div>
            </div>
        </div>
        <div class="feedback-form__fields">
            <div class="field" :class="{ error : inputs.message }">
               <textarea
                  id="message"
                  class="uk-textarea"
                  type="text"
                  :rows="props.rowsTextarea"
                  name="message"
                  v-model="model.message"
                  @focus="checkInputValue"
                  @blur="checkInputValue"
               />
               <label for="message" class="placeholder" :ref="(el) => { refs['message'] = el }">
                  {{ $t('feedbackMessage') }}
               </label>
               <div class="field__error" v-if="inputs.message && props.showErrorDetail">
                     {{ inputs.message }}
               </div>
            </div>
        </div>

        <div class="feedback-confirm">
            <button
                class="button button-primary button-solid"
                @click="recaptcha"
            >
               <span uk-spinner v-if="!enabled"></span>
               {{ $t('feedbackButton') }}
            </button>
            
            <div class="feedback-message message-success" v-if="success">
                <strong>
                    <span>{{ $t('feedbackStatusSuccess') }}</span>
                    {{ $t('feedbackMessageSuccess') }}
                </strong>
            </div>

            <div class="feedback-message message-error" v-if="!success && errors">
                <strong>
                    <span>{{ $t('feedbackStatusError') }}</span>
                    {{ errors.message }}
                </strong>
            </div> 
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, computed, watch, ref, toRefs  } from 'vue'
import { useI18n } from 'vue-i18n'
import { useReCaptcha } from 'vue-recaptcha-v3'
import '@/assets/sass/style.sass'

const { locale, t } = useI18n();
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

const props = defineProps({
	  rowsTextarea: Number,
     showErrorDetail: Boolean,
     postRequest: String,
});

const refs = ref(new Array());
const data =  reactive({
      errors: null,
      success: null,
      model:{
         name: null,
         email: null,
         message: null,
      },
      enabled: true,
      duration: 200
});

const { errors, success, model, enabled, duration } = toRefs(data)

const inputs = computed(() => {
   if (data.errors && data.errors.inputs) {
         return data.errors.inputs;
   }
   return {};
});

function checkInputValue(event) {
   const name = event.target.name;

   if (name && !event.target.value) {
      refs.value[name].classList.toggle('placeholder_top')
   }
}

async function postFeedbackForm(values) {
   let status = false;
   let timeout = duration;
   
   data.errors = null;
   data.success = false;
   data.enabled = false;

   await axios
         .post(props.postRequest, values)
         .then((response) => {
            status = response.data.success;
            if (response.data.success) {
               timeout = 0;
               for (let key in data.model) {
                  data.model[key] = null;
               }
               const pht = document.querySelectorAll('.placeholder_top');
               pht?.forEach(p => p.classList.remove('placeholder_top'));
               return;
            } 
            data.errors = response.data;
         });

   setTimeout(() => {
         data.enabled = true;
         data.success = status;
   }, timeout);
}

async function recaptcha() {
   let sendEnabled = enabled;
   data.errors = null;
  
   for (let key in data.model) {
      if (data.model[key] == null) {  
         let inputs = data.errors?.inputs ?? [];
         inputs[key] = t('feedbackItemError');

         data.errors = {
            message: t('feedbackMessageError'),
            inputs
         };    
         sendEnabled = false;
      }
   }
   
   if (sendEnabled) {
      await recaptchaLoaded()
      data.model['token'] = await executeRecaptcha('login');
      postFeedbackForm(data.model);
   }
}
</script>