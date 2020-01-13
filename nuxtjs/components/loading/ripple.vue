<template>
  <div v-if="loading" class="loading-layout">
    <div class="center">
      <div class="lds-ripple">
        <label>Loading...</label>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      loginStatus: 'modules/userDetail/authentication/currentLoginStatus'
    })
  },
  watch: {
    loginStatus(newLoginStatus, oldLoginStatus) {
      this.loading = newLoginStatus === 'loading';
    }
  }
};
</script>
<style lang="scss" scoped>
.loading-layout {
  text-align: center;
  position: fixed;
  opacity: 0.8;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #000;
}
.lds-ripple {
  label {
    color: #fff;
    position: absolute;
  }
  display: inline-block;
  position: absolute;
  top: 40%;
  left: 50%;
  width: 80px;
  height: 80px;
  text-align: left;
  padding-top: 80px;
  padding-left: 8px;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #f5832c;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
