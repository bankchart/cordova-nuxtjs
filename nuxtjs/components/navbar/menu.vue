<template>
  <div v-if="!reRender">
    <kendo-toolbar>
      <kendo-toolbar-item
        @click="$router.push('/')"
        :text="$t('pages.dashboard')"
        type="button"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        @click="$router.push('schedule')"
        :text="$t('pages.schedule')"
        type="button"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        :menu-buttons="[
          { text: 'above', icon: 'insert-up' },
          { text: 'between', icon: 'insert-middle' },
          { text: 'below', icon: 'insert-down' }
        ]"
        :text="$t('pages.options')"
        type="splitButton"
      >
      </kendo-toolbar-item>
      <kendo-toolbar-item
        @click="$router.push('login')"
        :text="$t('pages.login')"
        type="button"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        ref="test_toolbar"
        @click="switchLang"
        :text="switchLangTextButton"
        type="button"
        overflow="always"
      ></kendo-toolbar-item>
    </kendo-toolbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      reRender: false
    };
  },
  computed: {
    ...mapGetters({
      currentLang: 'multiLanguage/currentLang'
    }),
    switchLangTextButton() {
      return this.$i18n.locale === 'th' ? 'EN' : 'TH';
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    switchLang() {
      this.$i18n.locale = this.$i18n.locale === 'th' ? 'en' : 'th';
      this.reRenderElement();
    },
    reRenderElement() {
      this.reRender = true;
      this.$nextTick(() => {
        this.reRender = false;
      });
    }
  }
};
</script>
