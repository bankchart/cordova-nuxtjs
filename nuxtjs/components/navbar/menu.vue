<template>
  <div v-if="!reRender">
    <kendo-toolbar>
      <kendo-toolbar-item
        v-if="logged"
        @click="$router.push('/')"
        :text="$t('pages.dashboard')"
        type="button"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        v-if="logged"
        @click="$router.push('schedule')"
        :text="$t('pages.schedule')"
        type="button"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        v-if="logged"
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
        v-if="!logged"
        @click="$router.push('login')"
        :text="$t('pages.login')"
        type="button"
      ></kendo-toolbar-item>
      <kendo-toolbar-item
        v-if="logged"
        @click="logout"
        :text="$t('logoutLabel')"
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
      currentLang: 'multiLanguage/currentLang',
      logged: 'modules/userDetail/authentication/currentLogged'
    }),
    switchLangTextButton() {
      return this.$i18n.locale === 'th' ? 'EN' : 'TH';
    }
  },
  watch: {
    logged(newLogged, oldLogged) {
      this.reRenderElement();
    },
    currentLang(newCurrentLang, oldCurrentLang) {}
  },
  mounted() {},
  methods: {
    logout() {
      this.$utilities.deleteCookie('token');
      this.$store.dispatch('modules/userDetail/authentication/resetState');
      this.reRenderElement();
    },
    switchLang() {
      this.$i18n.locale = this.$i18n.locale === 'th' ? 'en' : 'th';
      this.reRenderElement();
    },
    reRenderElement() {
      this.reRender = true;
      this.$nextTick(() => {
        this.reRender = false;
        if (!this.logged) {
          this.$router.push('/login');
        }
      });
    }
  }
};
</script>
