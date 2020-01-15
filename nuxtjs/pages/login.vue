<template>
  <div>
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
      <button type="submit">{{ $t('loginLabel') }}</button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      vueComp: this,
      user: {
        username: null,
        password: null
      },
      userAuthen: 'modules/userDetail/authentication',
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      loadingStatus: 'session/currentLoadingStatus'
    })
  },
  watch: {
    loadingStatus(newLoadingStatus, oldLoadingStatus) {
      this.loading = newLoadingStatus === 'loading';
    }
  },
  mounted() {
    console.info(this);
  },
  methods: {
    resetData() {
      this.user = {
        username: null,
        password: null
      };
    },
    loginFormSubmit() {
      const result = this.$store.dispatch(`${this.userAuthen}/login`, {
        user: this.user,
        vueComp: this.vueComp
      });
      result
        .then((res) => {
          console.info(res);
          this.$utilities.setCookie('token', res.data.token);
          this.$router.push('/');
        })
        .catch((error) => {
          this.resetData();
          console.error(error);
        });
    }
  }
};
</script>
