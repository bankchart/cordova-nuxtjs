<template>
  <div class="container">
    <h3>Response: {{ response }}</h3>
    <form @submit.prevent="onSubmit" class="vertical-form">
      <div class="row">
        <div class="col-12">
          <label>{{ $t('firstName') }}</label>
          <input
            id="firstName"
            ref="firstName"
            v-model="firstNameField"
            type="text"
            class="input-text-field"
          />
          <i v-if="!validity.firstName" class="input-warning-label">{{
            $t('invalid')
          }}</i>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label>{{ $t('lastName') }}</label>
          <input
            id="lastName"
            ref="lastName"
            v-model="lastNameField"
            type="text"
            class="input-text-field"
          />
          <i v-if="!validity.lastName" class="input-warning-label">{{
            $t('invalid')
          }}</i>
        </div>
      </div>
      <div class="row">
        <div class="col-12 margin-top-10">
          <label>{{ $t('phoneNumber') }}</label>
          <kendo-maskedtextbox
            id="phoneNumber"
            ref="phoneNumber"
            v-model="phoneNumberField"
            mask="(999) 000-0000"
          >
          </kendo-maskedtextbox>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label>{{ $t('email') }}</label>
          <input
            id="email"
            ref="email"
            v-model="emailField"
            type="text"
            class="input-text-field"
          />
          <i v-if="!validity.email" class="input-warning-label">{{
            $t('invalid')
          }}</i>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <button type="submit" class="submit-button">{{ $t('save') }}</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vueComp: this,
      response: 'Empty',
      validity: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true
      },
      getterNames: {
        firstName: 'modules/forms/profile/firstName',
        lastName: 'modules/forms/profile/lastName',
        phoneNumber: 'modules/forms/profile/phoneNumber',
        email: 'modules/forms/profile/email'
      },
      actionNames: {
        firstName: 'modules/forms/profile/setFirstName',
        lastName: 'modules/forms/profile/setLastName',
        phoneNumber: 'modules/forms/profile/setPhoneNumber',
        email: 'modules/forms/profile/setEmail',
        saveProfile: 'modules/forms/profile/saveProfile'
      }
    };
  },
  computed: {
    firstNameField: {
      get() {
        return this.$store.getters[this.getterNames.firstName];
      },
      set(newValue) {
        const reg = new RegExp('^[\u0E00-\u0E7Fa-zA-Z]+$');
        const newValueTmp = (newValue || '').trim();
        this.$store.dispatch(this.actionNames.firstName, newValueTmp);
        this.validity.firstName = newValue ? reg.test(newValueTmp) : false;
        if (!this.validity.firstName) {
          this.$utilities.addClass(
            this.$refs.firstName,
            'input-text-field--invalid'
          );
        } else {
          this.$utilities.removeClass(
            this.$refs.firstName,
            'input-text-field--invalid'
          );
        }
      }
    },
    lastNameField: {
      get() {
        return this.$store.getters[this.getterNames.lastName];
      },
      set(newValue) {
        const reg = new RegExp('^[\u0E00-\u0E7Fa-zA-Z]+$');
        const newValueTmp = (newValue || '').trim();
        this.$store.dispatch(this.actionNames.lastName, newValueTmp);
        this.validity.lastName = newValue ? reg.test(newValueTmp) : false;
        if (!this.validity.lastName) {
          this.$utilities.addClass(
            this.$refs.lastName,
            'input-text-field--invalid'
          );
        } else {
          this.$utilities.removeClass(
            this.$refs.lastName,
            'input-text-field--invalid'
          );
        }
      }
    },
    phoneNumberField: {
      get() {
        return this.$store.getters[this.getterNames.phoneNumber];
      },
      set(newValue) {
        const newValueTmp = (newValue || '').trim();
        this.$store.dispatch(this.actionNames.phoneNumber, newValueTmp);
      }
    },
    emailField: {
      get() {
        return this.$store.getters[this.getterNames.email];
      },
      set(newValue) {
        const newValueTmp = (newValue || '').trim();
        this.$store.dispatch(this.actionNames.email, newValueTmp);
        this.validity.email = newValue
          ? this.$utilities.isEmailPattern(newValue)
          : false;
        if (!this.validity.email) {
          this.$utilities.addClass(
            this.$refs.email,
            'input-text-field--invalid'
          );
        } else {
          this.$utilities.removeClass(
            this.$refs.email,
            'input-text-field--invalid'
          );
        }
      }
    }
  },
  methods: {
    onSubmit($event) {
      for (const isValid of Object.values(this.validity)) {
        if (!isValid) {
          return;
        }
      }
      const result = this.$store.dispatch(
        this.actionNames.saveProfile,
        this.vueComp
      );
      result
        .then((res) => (this.response = JSON.stringify(res)))
        .catch((error) => (this.response = JSON.stringify(error)));
    }
  }
};
</script>
<style lang="scss" scoped>
.vertical-form {
  .input-text-field {
    border-radius: 4px;
  }
  .input-warning-label {
    font-size: 0.8rem;
    color: #e21414;
  }
  .submit-button {
    margin-top: 15px;
  }
}
.input-text-field--invalid {
  border: 1px solid #e21414;
}
.margin-top-10 {
  margin-top: 15px;
}
input[type='text'],
select,
textarea {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  resize: vertical;
  margin-bottom: 5px;
}
</style>
