<template>
  <div>
    {{ $t('appName') }}
    <button @click="setLang('en')">set cookie lang en</button>
    <button @click="setLang('th')">set cookie lang th</button>
    <button @click="callapi">test call api</button>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      result: 'empty'
    };
  },
  mounted() {},
  methods: {
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
    }
  }
};
</script>
