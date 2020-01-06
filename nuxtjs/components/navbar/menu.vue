<template>
  <div v-if="!rerender">
    <kendo-toolbar>
      <kendo-toolbar-item
        @click="$router.push('/')"
        :text="$t('appName')"
        type="button"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        @click="$router.push('schedule')"
        type="button"
        text="Schedule"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        :menu-buttons="[
          { text: 'above', icon: 'insert-up' },
          { text: 'between', icon: 'insert-middle' },
          { text: 'below', icon: 'insert-down' }
        ]"
        type="splitButton"
        text="Options"
      >
      </kendo-toolbar-item>
      <kendo-toolbar-item
        ref="test_toolbar"
        @click="switchLang"
        :text="this.$i18n.locale === 'th' ? 'EN' : 'TH'"
        type="button"
        overflow="always"
      ></kendo-toolbar-item>
    </kendo-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rerender: false
    };
  },
  beforeDestroy() {
    console.info('before destroy');
  },
  methods: {
    switchLang() {
      this.rerender = true;
      this.$i18n.locale = this.$i18n.locale === 'th' ? 'en' : 'th';
      this.$nextTick(() => {
        this.rerender = false;
        console.info('re-render start...');
        this.$nextTick(() => {
          console.info('re-render end!');
        });
      });
    }
  }
};
</script>
