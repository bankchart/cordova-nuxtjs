<template>
  <div>
    {{ $t('appName') }}
    <button @click="setLang('en')">set cookie lang en</button>
    <button @click="setLang('th')">set cookie lang th</button>
    <button @click="callapi">test call api</button>
    <button @click="setToken">add access token</button>
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
