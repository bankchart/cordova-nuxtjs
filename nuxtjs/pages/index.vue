<template>
  <div>
    {{ $t('appName') }}
  </div>
</template>
<script>
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
      userAuthen: 'modules/userDetail/authentication'
    };
  },
  methods: {
    resetData() {
      this.user = {
        username: null,
        password: null
      };
      this.data = [];
      this.result = 'empty';
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
