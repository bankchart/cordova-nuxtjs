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
