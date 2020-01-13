<template>
  <div>
    {{ $t('appName') }}
    <button @click="setLang('en')">set cookie lang en</button>
    <button @click="setLang('th')">set cookie lang th</button>
    <button @click="callapi">test call api</button>
    <button @click="setToken">add access token</button>
    <form
      id="login-form"
      ref="login-form"
      @submit.prevent="loginFormSubmit"
      class="login-form"
    >
      <input
        ref="username"
        v-model="user.username"
        placeholder="Enter your username"
        type="text"
      />
      <input
        ref="password"
        v-model="user.password"
        placeholder="Enter your password"
        type="password"
      />
      <button type="submit">LOGIN</button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      vueComp: this,
      loading: true,
      data: [],
      user: {
        username: null,
        password: null
      },
      result: 'empty',
      count: 0,
      userAuthen: 'modules/userDetail/authentication'
    };
  },
  computed: {
    ...mapGetters({
      loginStatus: 'modules/userDetail/authentication/currentLoginStatus'
    })
  },
  watch: {
    loginStatus(newLoginStatus, oldLoginStatus) {}
  },
  mounted() {},
  methods: {
    resetData() {
      this.user = {
        username: null,
        password: null
      };
      this.data = [];
      this.result = 'empty';
    },
    loginFormSubmit() {
      const result = this.$store.dispatch(`${this.userAuthen}/login`, {
        user: this.user,
        vueComp: this.vueComp
      });
      result
        .then((res) => {
          console.info(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    callapi() {
      this.$axios
        .post('/auth')
        .then((data) => {
          console.info(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setLang(lang) {
      this.$utilities.setCookie('lang', lang);
    },
    setToken() {
      this.$utilities.setCookie(
        'token',
        'eyJpdiI6IjZlYTRiYjgwNDk3NDNiNTZkYmYwYzcyYjRiNmQzMGYxIiwiZW5jcnlwdGVkRGF0YSI6IjllNTA4MzAwNTE1NGMxNzIzM2JkMDk0YmY1MDI3N2JmZmExMjlkNjNkYTk5OTk1MjY2Zjc2YTM1MzIzMWNlODNjZGMxN2JlN2U5ZjI2Y2U3MWYwMGNiY2EzNGRhNzlmMiJ9'
      );
    }
  }
};
</script>
<style lang="scss">
.login-form {
  width: 100%;
  padding-top: 15px;
}
.lds-hourglass {
  height: 100%;
  width: 100%;
}
</style>
