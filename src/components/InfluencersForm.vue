<template>
  <div id="influencers-form-container">
    <form id="influencers-form" class="form" :style="formStyle">

      <!-- Step 1 -->
      <div :class="{active : activeStep === 1}" class="step step-1">
        <div class="field">
          <label class="label">{{ language === 'sl' ? 'Ime in priimek' : 'Name' }}</label>
          <div class="control has-icons-right has-icons-left">
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span v-if="validFullName" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="invalidFullName" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <input
              v-if="language === 'en'"
              :class="{'is-success' : validFullName, 'is-danger' : invalidFullName}"
              v-validate="{required: true, alpha_spaces: true}"
              v-model="full_name"
              name="full_name"
              autocomplete="name"
              class="input"
              type="text"
              placeholder="Enter your full name"
            />
            <input
              v-if="language === 'sl'"
              :class="{'is-success' : validFullName, 'is-danger' : invalidFullName}"
              v-validate="{required: true, alpha_spaces: true}"
              v-model="full_name"
              name="full_name"
              autocomplete="name"
              class="input"
              type="text"
              placeholder="Vnesite ime in priimek"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ language === 'sl' ? 'E-pošta' : 'Email' }}</label>
          <div class="control has-icons-right has-icons-left">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span v-if="validEmail" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="invalidEmail" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <input
              v-if="language === 'en'"
              :class="{'is-success' : validEmail, 'is-danger' : invalidEmail}"
              v-validate="{required: true, email: true}"
              v-model="email"
              name="email"
              autocomplete="email"
              class="input"
              type="text"
              placeholder="Enter your email address"
            />
            <input
              v-if="language === 'sl'"
              :class="{'is-success' : validEmail, 'is-danger' : invalidEmail}"
              v-validate="{required: true, email: true}"
              v-model="email"
              name="email"
              autocomplete="email"
              class="input"
              type="text"
              placeholder="Vnesite svoj e-poštni naslov"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">{{ language === 'sl' ? 'Telefonska številka' : 'Phone number' }}</label>
          <div class="control has-icons-right has-icons-left">
            <span class="icon is-small is-left">
              <i class="fas fa-phone"></i>
            </span>
            <span v-if="validPhoneNum" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="invalidPhoneNum" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <input
              v-if="language === 'en'"
              :class="{'is-success' : validPhoneNum, 'is-danger' : invalidPhoneNum}"
              v-validate="{required: true, numeric: true, min: 7, max: 12}"
              v-model="phone_num"
              name="phone_num"
              autocomplete="tel"
              class="input"
              type="text"
              placeholder="Enter your phone number"
            />
            <input
              v-if="language === 'sl'"
              :class="{'is-success' : validPhoneNum, 'is-danger' : invalidPhoneNum}"
              v-validate="{required: true, numeric: true, min: 7, max: 12}"
              v-model="phone_num"
              name="phone_num"
              autocomplete="tel"
              class="input"
              type="text"
              placeholder="Vnesite svojo telefonsko številko"
            />
            <p class="help">{{ language === 'sl' ? 'Vnesite samo številke' : 'Enter only digits' }}</p>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div :class="{active : activeStep === 2}" class="step step-2">
        <div class="field">
          <label class="label">Facebook</label>
          <div class="control has-icons-right has-icons-left">
            <span class="icon is-small is-left">
              <i class="fab fa-facebook-f"></i>
            </span>
            <span v-if="validFacebook" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="invalidFacebook" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <input
              v-if="language === 'en'"
              :class="{'is-success' : validFacebook, 'is-danger' : invalidFacebook}"
              v-validate="{required: false, url: true}"
              v-model="facebook"
              name="facebook"
              class="input"
              type="url"
              placeholder="Link to your facebook profile"
            />
            <input
              v-if="language === 'sl'"
              :class="{'is-success' : validFacebook, 'is-danger' : invalidFacebook}"
              v-validate="{required: false, url: true}"
              v-model="facebook"
              name="facebook"
              class="input"
              type="url"
              placeholder="Povezava do vašega facebook profila"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Instagram</label>
          <div class="control has-icons-right has-icons-left">
            <span class="icon is-small is-left">
              <i class="fab fa-instagram"></i>
            </span>
            <span v-if="validInstagram" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="invalidInstagram" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <input
              v-if="language === 'en'"
              :class="{'is-success' : validInstagram, 'is-danger' : invalidInstagram}"
              v-validate="{required: false, url: true}"
              v-model="instagram"
              name="instagram"
              class="input"
              type="url"
              placeholder="Link to your instagram profile"
            />
            <input
              v-if="language === 'sl'"
              :class="{'is-success' : validInstagram, 'is-danger' : invalidInstagram}"
              v-validate="{required: false, url: true}"
              v-model="instagram"
              name="instagram"
              class="input"
              type="url"
              placeholder="Povezava do vašega instagram profila"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Youtube</label>
          <div class="control has-icons-right has-icons-left">
            <span class="icon is-small is-left">
              <i class="fab fa-youtube"></i>
            </span>
            <span v-if="validYoutube" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="invalidYoutube" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <input
              v-if="language === 'en'"
              :class="{'is-success' : validYoutube, 'is-danger' : invalidYoutube}"
              v-validate="{required: false, url: true}"
              v-model="youtube"
              name="youtube"
              class="input"
              type="url"
              placeholder="Link to your youtube channel"
            />
            <input
              v-if="language === 'sl'"
              :class="{'is-success' : validYoutube, 'is-danger' : invalidYoutube}"
              v-validate="{required: false, url: true}"
              v-model="youtube"
              name="youtube"
              class="input"
              type="url"
              placeholder="Povezava do vašega youtube kanala"
            />
          </div>
        </div>
      </div>

      <!-- Step 3 -->
      <div :class="{active : activeStep === 3}" class="step step-3">
        <div class="field">
          <label v-if="language === 'en'" class="label">Tell us more about you</label>
          <label v-if="language === 'sl'" class="label">Povejte nam več o sebi</label>
          <div class="control has-icons-right">
            <span v-if="validDescription" class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
            <span v-if="invalidDescription" class="icon is-small is-right">
              <i class="fas fa-times"></i>
            </span>
            <textarea
              v-if="language === 'en'"
              :class="{'is-success' : validDescription, 'is-danger' : invalidDescription}"
              v-validate="{required: true}"
              v-model="description"
              name="description"
              class="textarea"
              placeholder="Describe yourself..."
            ></textarea>
            <textarea
              v-if="language === 'sl'"
              :class="{'is-success' : validDescription, 'is-danger' : invalidDescription}"
              v-validate="{required: true}"
              v-model="description"
              name="description"
              class="textarea"
              placeholder="Predstavite se..."
            ></textarea>
          </div>
        </div>
        <div class="field">
          <div class="custom-checkbox-container">
            <input 
              type="checkbox"
              name="not_a_robot"
              id="not-a-robot"
              v-model="not_a_robot"
              v-validate="{required: true}"
            >
            <label for="not-a-robot"></label>
          </div>
          <label for="not-a-robot" class="label centered">{{ language === 'sl' ? 'Nisem robot' : 'Not a robot' }}</label>
        </div>
        <input type="hidden" name="check" v-model="check">
      </div>
    </form>
    <div class="submit-btn-container">
      <input 
        :class="{disabled : (activeStep === 1 && !validFirstStep) || (activeStep === 2 && !validSecondStep) || (activeStep === 3 && !validThirdStep)}"
        @click="handleSubmitBtnClick"
        id="submit-btn"
        type="submit"
        :value="submitButtonValue"
      >
    </div>
    <div class="steps-container">
      <span @click="changeFormStep(1)" :class="{active : activeStep === 1, visited : activeStep > 1}"></span>
      <span @click="changeFormStep(2)" :class="{active : activeStep === 2, visited : activeStep > 2}"></span>
      <span @click="changeFormStep(3)" :class="{active : activeStep === 3}"></span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as qs from 'query-string';

export default {
  name: 'InfluencersForm',
  data() {
    return {
      activeStep: 1,
      full_name: '',
      email: '',
      phone_num: '',
      facebook: '',
      youtube: '',
      instagram: '',
      description: '',
      not_a_robot: false,
      check: '',
      env: process.env.NODE_ENV
    }
  },
  methods: {
    validateStep(i) {
      if (i === 2) {
        return this.validFirstStep;
      }
      if (i === 3) {
        return this.validFirstStep && this.validSecondStep;
      }
    },
    changeFormStep(i) {
      const goingForward = i > this.activeStep;
      if(this.validateStep(i) && goingForward) {
        this.activeStep = i;
      } else if(!goingForward) {
        this.activeStep = i;
      }
    },
    clearInputs() {
      this.changeFormStep(1);
      this.full_name = '';
      this.email = '';
      this.phone_num = '';
      this.facebook = '';
      this.instagram = '';
      this.youtube = '';
      this.description = '';
      this.not_a_robot = false;
    },
    handleSubmitBtnClick(e) {
      e.preventDefault();
      if (this.activeStep !== 3) {
        this.changeFormStep(this.activeStep + 1);
      }
      if (this.activeStep === 3) {
        this.submitForm();
      }
    },
    submitForm() {
      if (this.validFirstStep && this.validSecondStep && this.validThirdStep) {
        let formdata = {
          full_name: this.full_name,
          email: this.email,
          phone_num: this.phone_num,
          facebook: this.facebook,
          instagram: this.instagram,
          youtube: this.youtube,
          description: this.description
        }
        let url = this.env === 'development' ? 'http://localhost:8000' : 'http://206.189.57.136/api/submit-influencer-form/';

        this.$store.dispatch('changeFormLoadingStatus', true);

        axios.post(url, qs.stringify(formdata))
          .then(res => {
            this.$store.dispatch('changeFormLoadingStatus', false);
            this.clearInputs();
            if (res.status) {
              this.$store.dispatch('formSubmitted', res.data.msg);
            } else {
              let msg = res ? res.statusText : 'Unknow error...';
              this.$store.dispatch('attachFormErrors', {status: true, msg: msg}); 
            }
          })
          .catch(err => {
            let msg = err.response ? err.response.statusText : 'Unknown error...';
            this.$store.dispatch('changeFormLoadingStatus', false);
            this.clearInputs();
            this.$store.dispatch('attachFormErrors', {status: true, msg: msg});
          });
      }
    }
  },
  computed: {
    language() {
      return this.$store.getters.getLanguage;
    },
    factor() {
      if (this.$store.getters.getWindowWidth > 991) {
        return 480
      } else if(this.$store.getters.getWindowWidth > 768 && this.$store.getters.getWindowWidth < 991) {
        return 340
      } else {
        return 320
      }
    },
    formStyle() {
      let offset = this.factor * (this.activeStep - 1);
      return {
        transform: `translate3d(-${offset}px, 0, 0)`
      }
    },
    submitButtonValue() {
      if (this.language === 'en') {
        return this.activeStep === 3 ? 'Submit form' : 'Next step';
      } else {
        return this.activeStep === 3 ? 'Pošlji obrazec' : 'Naslednji korak';
      }
    },
    validFirstStep() {
      return this.validFullName && this.validEmail && this.validPhoneNum;
    },
    validSecondStep() {
      return this.validFacebook || this.validInstagram || this.validYoutube;
    },
    validThirdStep() {
      return this.validDescription && this.validNotRobot && this.check.length === 0;
    },
    validFullName() {
      if (this.fields.full_name) {
        return this.fields.full_name.valid;
      } else {
        return false;
      }
    },
    invalidFullName() {
      if (this.fields.full_name) {
        return this.fields.full_name.invalid && this.fields.full_name.changed;
      } else {
        return false;
      }
    },
    validEmail() {
      if (this.fields.email) {
        return this.fields.email.valid;
      } else {
        return false;
      }
    },
    invalidEmail() {
      if (this.fields.email) {
        return this.fields.email.invalid && this.fields.email.changed;
      } else {
        return false;
      }
    },
    validPhoneNum() {
      if (this.fields.phone_num) {
        return this.fields.phone_num.valid;
      } else {
        return false;
      }
    },
    invalidPhoneNum() {
      if (this.fields.phone_num) {
        return this.fields.phone_num.invalid && this.fields.phone_num.changed;
      } else {
        return false;
      }
    },
    validFacebook() {
      if (this.fields.facebook) {
        return this.fields.facebook.valid && this.facebook.length > 0;
      } else {
        return false;
      }
    },
    invalidFacebook() {
      if (this.fields.facebook) {
        return this.fields.facebook.invalid && this.fields.facebook.changed;
      } else {
        return false;
      }
    },
    validInstagram() {
      if (this.fields.instagram) {
        return this.fields.instagram.valid && this.instagram.length > 0;
      } else {
        return false;
      }
    },
    invalidInstagram() {
      if (this.fields.instagram) {
        return this.fields.instagram.invalid && this.fields.instagram.changed;
      } else {
        return false;
      }
    },
    validYoutube() {
      if (this.fields.youtube) {
        return this.fields.youtube.valid && this.youtube.length > 0;
      } else {
        return false;
      }
    },
    invalidYoutube() {
      if (this.fields.youtube) {
        return this.fields.youtube.invalid && this.fields.youtube.changed;
      } else {
        return false;
      }
    },
    validDescription() {
      if (this.fields.description) {
        return this.fields.description.valid;
      } else {
        return false;
      }
    },
    invalidDescription() {
      if (this.fields.description) {
        return this.fields.description.invalid && this.fields.description.changed;
      } else {
        return false;
      }
    },
    validNotRobot() {
      if (this.fields.not_a_robot) {
        return this.fields.not_a_robot.valid;
      } else {
        return false;
      }
    }
  }
}
</script>

<style lang="sass" scoped>
#influencers-form-container
  width: 100%
  display: flex
  align-items: center
  padding: 0 2em
  @media screen and (max-width: 768px)
    padding: 0
#influencers-form
  width: 100%
  display: flex
  justify-content: center
  +easeTransition(500ms)

  .step
    max-width: 100%
    width: 480px
    visibility: hidden
    transition: opacity 300ms ease-in-out 250ms
    opacity: 0
    @media screen and (max-width: 991px)
      width: 340px
    @media screen and (max-width: 768px)
      width: 320px
    &.active
      visibility: visible
      opacity: 1

.steps-container
  display: flex
  position: absolute
  bottom: 1em
  left: 3em
  justify-content: center
  min-height: 20px
  width: 480px
  @media screen and (max-width: 991px)
    width: 340px
    bottom: 10px
  @media screen and (max-width: 768px)
    width: 320px
    left: 2em
  & > span
    +getSquare(15px)
    border-radius: 50%
    margin: 0 .5em
    border: 2px solid $primary
    +bounceTransition(300ms)
    &:hover
      cursor: pointer
    &.active
      box-shadow: $shadow-1
      background: $primary
      transform: scale(1.1)
    &.visited
      transform: scale(1)
      background: $primary
      opacity: .5
      border: 2px solid $primary

.submit-btn-container
  position: absolute
  bottom: 75px
  left: 3em
  width: 480px
  display: flex
  justify-content: center
  @media screen and (max-width: 991px)
    width: 340px
    bottom: 45px
  @media screen and (max-width: 768px)
    width: 320px
    left: 2em
  #submit-btn
    position: relative
    z-index: 10
    outline: none
    border: none
    background: $primary
    border-radius: 200px
    padding: .75em 1em
    color: $white
    text-transform: uppercase
    font-weight: 900
    box-shadow: $shadow-1
    font-size: .75em
    -webkit-appearance: none;
    -moz-appearance: none;
    +bounceTransition(500ms)
    &.disabled
      box-shadow: none
      background: transparentize($black, .5)
      opacity: .75
      color: $black
      &:hover
        cursor: default
        transform: none
        box-shadow: none
    &:hover
      cursor: pointer
      transform: translate3d(0, -3px, 0)
      box-shadow: $shadow-3

input,
textarea,
.textarea,
.input
  &.is-danger
    &:focus
      border-color: $error
  &.is-success
    border-color: $primary
    &:focus
      border-color: $primary
      box-shadow: 0 0 0 0.125em transparentize($primary, .75)
  &:focus
    border-color: $black
    outline: none
    box-shadow: none

.label.centered
  text-align: center
  font-size: .75em

.custom-checkbox-container
  display: flex
  align-items: center
  flex-direction: column
  margin-bottom: .5em
  input
    display: block
    opacity: 0
    &:checked + label
      background: $primary
    &:checked + label:after
      left: auto
      right: 0
  label
    width: 60px
    height: 30px
    cursor: pointer
    display: inline-block
    position: relative
    background: rgb(189, 189, 189)
    border-radius: 30px
    transition: background-color 0.4s
    -moz-transition: background-color 0.4s
    -webkit-transition: background-color 0.4s
    &::after
      left: 0
      width: 20px
      height: 20px
      margin: 5px
      content: ''
      position: absolute
      background: $white
      border-radius: 10px
</style>

