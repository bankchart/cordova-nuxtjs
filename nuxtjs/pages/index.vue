<template>
  <div>
    <nuxt-link to="/schedule">calendar</nuxt-link>
    <ul>
      <li v-for="(text, index) of data" :key="index">{{ text }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      this.data.push(
        `${i +
          1} - Hi POC Mobile App Framework FrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFrameworkFramework`
      );
    }
  }
};
</script>
